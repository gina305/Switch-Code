import { getBlogPosts } from './airtable.js';

const searchBox = document.getElementById('search-box');
const blogCards = document.getElementById('blog-cards');

function renderBlogCards(posts) {
  blogCards.innerHTML = '';

  posts.forEach(post => {
    const card = document.createElement('div');
    card.classList.add('blog-card');
    card.innerHTML = `
      <h2>${post.get('Title')}</h2>
      <p>By ${post.get('Author')}</p>
      <p>${post.get('Date')}</p>
      <p>${post.get
