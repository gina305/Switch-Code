// import { getBlogPosts } from './airtable.js';

// const searchBox = document.getElementById('search-box');
// const blogCards = document.getElementById('blog-cards');

// function renderBlogCards(posts) {
//   blogCards.innerHTML = '';

//   posts.forEach(post => {
//     const card = document.createElement('div');
//     card.classList.add('blog-card');
//     card.innerHTML = `
//       <h2>${post.get('Title')}</h2>
//       <p>${post.get('Publish Date')}</p>`;
//       blogCards.appendChild(card);
//     });
//   }
  
//   function filterBlogCards(posts, query) {
//   return posts.filter(post => {
//   const title = post.get('Title').toLowerCase();
//   const author = post.get('Author').toLowerCase();
//   const content = post.get('Content').toLowerCase();
//   return title.includes(query) || author.includes(query) || content.includes(query);
//   });
//   }
  
//   async function init() {
//   try {
//   const posts = await getBlogPosts();
//   renderBlogCards(posts);

//   searchBox.addEventListener('input', () => {
//     const query = searchBox.value.trim().toLowerCase();
//     const filteredPosts = filterBlogCards(posts, query);
//     renderBlogCards(filteredPosts);
//   });
// } catch (error) {
//   console.error(error);
//   }
//   }
  
//   init();