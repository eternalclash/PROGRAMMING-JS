const container = document.getElementById("root")

const content = document.createElement('div')
const ajax = new XMLHttpRequest () ; //서버호출
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json'
const NEWS_URL = `https://api.hnpwa.com/v0/news/1.json`
ajax.open('GET','https://api.hnpwa.com/v0/news/1.json', false); //false이기 때문에 동기적
ajax.send();

const ul = document.createElement('ul'); //태그 생성

function getData(url) {
    ajax.open('GET', url, false);
    ajax.send();

    return JSON.parse(ajax.response)
} // 코드를 중복시키지 않는 방법: 함수

function newsFeed() {
    const newsFeed = getData(NEWS_URL);
    const newsList = [];
    newsList.push(`<ul>`)

for (let i= 0; i< 10; i++) 
{
  newsList.push(
      `
      <li>
     <a href="#${newsFeed[i].id}">
     ${newsFeed[i].title}(${newsFeed[i].comments_count})
     </a>
      </li>
      `
  )
}

newsList.push(`</ul>`)
container.innerHTML = newsList.join('');    
}

function newsDetail(){
   console.log(location.hash) //브라우저 location에 대한 정보가 나타남
    const id=location.hash.substr(1);
    ajax.open('GET', CONTENT_URL.replace('@id',id),false) //replace를 통한 id 대체
    ajax.send();
    const newsContent = JSON.parse(ajax.response);
    const title = document.createElement('h1')
    container.innerHTML = 
    `
    <h1>${newsContent.title}</h1>
    <div>
    <a href="">목록으로</a>
    </div>
    
    `
}


function router() {
    const routePath = location.hash;

    if(routePath === '')
    {
        newsFeed();
    }
    else {
        newsDetail();
    }
}

window.addEventListener('hashchange',router)
router();
