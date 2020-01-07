export const fullStory001 = '{"similarMovieIds":["def456","ghi789"],"logLine":"A movie! That\'s full of stuff!","runtimeMin":100}';

export const diff001 = '[{"kind":"N","path":["logLine"],"rhs":"a movie"}]';
export const diff002 = '[{"kind":"N","path":["similarMovies","uuid2"],"rhs":{"id":"uuid2"}},{"kind":"A","path":["stories","uuid1","similarMovieIds"],"index":1,"item":{"kind":"N","rhs":"def456"}}]';

export const fullWorkspace001 = '{"similarMovies":{"uuid2":{"id":"uuid2","title":"Tenet","runtimeMin":123}},"stories":{"uuid1":{"similarMovieIds":["uuid2"],"logLine":"My new log line"}},"history":[{"userEmail":"jon.simpkins@gmail.com","editStartEpochMs":12345,"editEndEpochMs":12346,"msSpendAnalyzing":1000}]}';
