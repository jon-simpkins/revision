export const fullStory001 = '{"similarMovies":[{"title":"Tenet","runtimeMin":145},{"title":"The Grinch","runtimeMin":90}],"id":"abc123","logLine":"A movie! That\'s full of stuff!","runtimeMin":100}';

export const diff001 = '[{"kind":"N","path":["id"],"rhs":"abc123"}]';
export const diff002 = '[{"kind":"A","path":["similarMovies"],"index":0,"item":{"kind":"N","rhs":{"title":"Tenet","runtimeMin":123}}},{"kind":"E","path":["logLine"],"lhs":"Log Line 1","rhs":"Log Line 2"}]';
