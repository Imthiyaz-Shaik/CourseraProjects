document.getElementById('recommendation-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const recommendation = document.getElementById('recommendation').value;
    if (recommendation) {
      const newRecommendation = document.createElement('blockquote');
      newRecommendation.textContent = recommendation;
      document.querySelector('.recommendation-list').appendChild(newRecommendation);
      document.getElementById('recommendation').value = '';
    }
  });
  