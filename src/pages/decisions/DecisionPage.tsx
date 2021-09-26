import React, {Component, ReactElement} from 'react';

type Candidate = {
  label: string;
  description: string;
  currentScore: number;
}

type MyState = {
  showListInput: boolean;
  showCurrentScores: boolean;
  nextCandidateLabel: string;
  nextCandidateDesc: string;

  candidates: Candidate[];
  winMatrix: number[][];
  candidateIndexA: number;
  candidateIndexB: number;
}

export default class DecisionPage extends Component<any, MyState> {


  state: MyState = {
    showListInput: true,
    showCurrentScores: false,
    nextCandidateLabel: '',
    nextCandidateDesc: '',
    candidates: [],
    winMatrix: [],
    candidateIndexA: -1,
    candidateIndexB: -1,
  };

  addCandidate(): void {
    let newCandidates = [...this.state.candidates, {
      label: this.state.nextCandidateLabel,
      description: this.state.nextCandidateDesc,
      currentScore: 1
    } as Candidate];

    this.setState({
      ...this.state,
      candidates: newCandidates,
      nextCandidateLabel: '',
      nextCandidateDesc: '',
    });
  }

  parseCandidateList(): void {
    let candidateList = this.state.candidates;
    let winMatrix = [...Array(candidateList.length)].map(e => Array(candidateList.length).fill(0.1)) as number[][];

    for (let i = 0; i < winMatrix.length; i++) {
      winMatrix[i][i] = 0;
    }

    this.setState({
      ...this.state,
      showListInput: false,
      candidates: candidateList,
      winMatrix: winMatrix
    }, () => {
      this.setupNewComparison();
    });
  }

  setupNewComparison(): void {
    let indexAWeights = this.state.candidates.map((ignore, idx) => {
      return 1 / this.getTotalComparisons(idx);
    });

    let indexA = this.randomSelectWeighted(indexAWeights);

    let indexBWeights = indexAWeights.map((ignore, idx) => {
      if (idx === indexA) {
        return 0;
      }

      return 1 / (this.state.winMatrix[idx][indexA] + this.state.winMatrix[indexA][idx]);
    });

    let indexB = this.randomSelectWeighted(indexBWeights);

    this.setState({
      ...this.state,
      candidateIndexA: indexA,
      candidateIndexB: indexB,
    })
  }

  randomSelectWeighted(weights: number[]): number {
    let sumWeight = weights.reduce(((previousValue, currentValue) => previousValue + currentValue));

    let randomCutoff = Math.random() * sumWeight;
    let sum = 0;
    for (let i = 0; i < weights.length; i++) {
      sum += weights[i];
      if (sum >= randomCutoff) {
        return i;
      }
    }

    throw Error('should not get here');
  }

  getTotalComparisons(index: number): number {
    let totalComparisons = 0;
    for (let i = 0; i < this.state.winMatrix.length; i++) {
      totalComparisons += this.state.winMatrix[index][i] + this.state.winMatrix[i][index];
    }

    return totalComparisons;
  }

  renderComparison(): ReactElement {
    if (this.state.candidateIndexA < 0 || this.state.candidateIndexB < 0) {
      return (<div>no comparison yet</div>);
    }

    let candidateA = this.state.candidates[this.state.candidateIndexA];
    let candidateB = this.state.candidates[this.state.candidateIndexB];

    return (<div style={{marginTop: '100px', marginBottom: '100px'}}>
      <h2>Comparison</h2>
      <div style={{display: 'flex'}}>
        <div style={{flex: 1}}>
          <h3>{candidateA.label}
            <button onClick={() => this.updateWin(this.state.candidateIndexA, this.state.candidateIndexB)}>Select</button>
          </h3>
          {candidateA.description.split('\n').map(line => (<p>{line}</p>))}
        </div>
        <div style={{flex: 1}}>
          <h3>{candidateB.label}
            <button onClick={() => this.updateWin(this.state.candidateIndexB, this.state.candidateIndexA)}>Select</button>
          </h3>
          {candidateB.description.split('\n').map(line => (<p>{line}</p>))}
        </div>
      </div>
    </div>)
  }

  updateWin(winIndex: number, loseIndex: number): void {
    let winMatrix = this.state.winMatrix;
    winMatrix[winIndex][loseIndex] += 1;

    let candidates = this.state.candidates;

    // Update all the scores
    // Based on sloppy implementation of https://stats.stackexchange.com/questions/83005/how-to-calculate-ratings-rankings-from-paired-comparison-pairwise-comparison-o
    for (let iteration = 0; iteration < 1000; iteration++) {
      // Naive iteration for now

      for (let i = 0; i < candidates.length; i++) {

        let W_i = 0;
        for (let j = 0; j < candidates.length; j++) {
          W_i += winMatrix[i][j];
        }

        let denominator = 0;
        for (let j = 0; j < candidates.length; j++) {
          if (i !== j) {
            let N_ij = winMatrix[i][j] + winMatrix[j][i];
            denominator += (N_ij) / (candidates[i].currentScore + candidates[j].currentScore);
          }
        }

        candidates[i].currentScore = W_i / denominator;
      }

      // Re-normalize
      let averageValue = 0;
      for (let i = 0; i < candidates.length; i++) {
        averageValue += candidates[i].currentScore;
      }
      averageValue /= candidates.length;
      for (let i = 0; i < candidates.length; i++) {
        candidates[i].currentScore /= averageValue;
      }
    }



    this.setState({
      ...this.state,
      candidates: candidates,
      winMatrix: winMatrix
    }, () => {
      this.setupNewComparison();
    });
  }

  renderWinMatrix(): ReactElement {
    if (!this.state.showCurrentScores) {
      return (<div></div>);
    }

    return (<div><h2>Current Win Matrix</h2><pre>
      {this.state.winMatrix.map(line => {
        return line.join(',\t') + '\n';
      })}
    </pre></div>)
  }

  renderCandidates(): ReactElement {
    if (!this.state.showCurrentScores && !this.state.showListInput) {
      return (<div></div>);
    }

    let sortedCandidates = this.state.candidates.sort((a, b) => b.currentScore - a.currentScore);

    return (<div>
      <h2>{sortedCandidates.length} Candidates</h2>
      {sortedCandidates.map(candidate => {
        return (<div>
          <h3>{candidate.label} ({candidate.currentScore})</h3>
        </div>);
      })}
    </div>);
  }

  toggleShowCurrentScores(): void {
    this.setState(
        {...this.state, showCurrentScores: !this.state.showCurrentScores}
    );
  }

  updateNextCandidateLabel(newValue: string): void {
    this.setState({
      ...this.state,
      nextCandidateLabel: newValue
    });
  }

  updateNextCandidateDesc(newValue: string): void {
    this.setState({
      ...this.state,
      nextCandidateDesc: newValue
    });
  }

  render() {
    let mainContent;
    if (this.state.showListInput) {
      mainContent = (
        <div>
          <h2>Declare Candidates</h2>
          <p>
            Let's create some candidates
          </p>
          <div>
            <input
                type='text'
                value={this.state.nextCandidateLabel}
                onChange={(e) => this.updateNextCandidateLabel(e.target.value)} />
            <textarea
                value={this.state.nextCandidateDesc}
                onChange={(e) => this.updateNextCandidateDesc(e.target.value)}></textarea>
          </div>

          <button style={{display: 'block'}} onClick={() => this.addCandidate()}>Add Candidate</button>
          <button style={{display: 'block'}} onClick={() => this.parseCandidateList()}>Parse and begin</button>
          {this.renderCandidates()}
        </div>
      );
    } else {
      mainContent = (<div>
        {this.renderComparison()}

        <button style={{display: 'block'}} onClick={() => this.toggleShowCurrentScores()}>Toggle results</button>

        {this.renderWinMatrix()}
        {this.renderCandidates()}
      </div>);
    }

    return (
        <div style={{margin: '24px'}}>
          <h1>Decisions</h1>
          <p>
            Let's make some decisions based on pairwise comparisons. You know that FaceMash scene in Social Network?
            It's just like that, except hopefully you're using it for better decisions.
          </p>
          {mainContent}
        </div>
    );
  }
}
