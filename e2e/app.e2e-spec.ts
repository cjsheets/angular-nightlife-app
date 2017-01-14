import { AngularNightlifeAppPage } from './app.po';

describe('angular-nightlife-app App', function() {
  let page: AngularNightlifeAppPage;

  beforeEach(() => {
    page = new AngularNightlifeAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
