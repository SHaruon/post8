const webdriver = require('selenium-webdriver');
const { Builder, By, until } = webdriver;
const chrome = require('selenium-webdriver/chrome');



//投稿したい内容
//---------------------------------------------

var keijiban_url = 'https://game8.jp/minecraft/214224';//投稿したい掲示板のURL
var user_name = "テストくん";//自分の名前を入力
var user_text = "テストだよーん";

//---------------------------------------------


(async()=>{

  //chromeの起動オプション。headlessを指定すると完全にcui操作になる
  let options = new chrome.Options();
  options.addArguments('--headless',`--window-size=1980,5000`);

  //chromeドライバを起動
  let driver = await new Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .build();
  
  //掲示板のURL
  await driver.get(keijiban_url);

  
  //入力の領域をタッチ
  let dumy = await driver.findElement(By.id('js-commentFormDumy'));
  //driver.executeScript("arguments[0].scrollIntoView(true);",dumy);//入力の領域に移動
  dumy.click();

  //--------ここから、HTMLの要素を選んで文字入力、クリック処理をしている

  //ユーザ名
  let send_name = await driver.findElement(By.name('archive_comment[name]'));
  await send_name.clear();
  await send_name.sendKeys(user_name);
  
  await time(5000);


  //投稿内容のテキスト
  let send_text = await driver.findElement(By.name('archive_comment[body]'));
  await send_text.sendKeys(user_text);

  await time(5000);

  //投稿処理
  let button = await driver.findElement(By.id('js-comment-post'));
  button.click();

  await time(10000);

  //--------投稿処理ここまで

  // ブラウザを終了する
  driver.quit();

})();


//時間待ち関数
function time(num){
  return new Promise((resolve) => {
     setTimeout(resolve,num);
  });
 
}


