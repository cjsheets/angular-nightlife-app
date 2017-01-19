// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  api_url: 'http://localhost:5000',
  yelp: {
    expires_in: 15551999,
    token_type: 'Bearer',
    access_token: '1L95-1k__fVwCWkV3jFGYbPB_4p2PZF5Su40wE6fny_pEN7imeDN9noDhoLOK4FT3byJkhnckqKOTDRaFEAa0bitY2wmugpSoAf0dJT9JhnKQ2sTdRjB5TASsqt5WHYx'
  }
};