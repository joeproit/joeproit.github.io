fetch('https://api.github.com/users/username/repos')
  .then(response => response.json())
  .then(data => {
    // Sort repositories by last updated date (descending order)
    const sortedRepos = data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    // Get the last 4 updated repositories
    const last4Repos = sortedRepos.slice(0, 4);

    // Generate the HTML for repository cards
    const repoListElement = document.getElementById('repoList');
    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8';

    last4Repos.forEach(repo => {
      // Create repository card elements
      const card = document.createElement('div');
      card.className = 'course-card';

      const image = document.createElement('img');
      image.src = 'https://via.placeholder.com/500x300?text=' + repo.name;
      image.alt = repo.name;

      const title = document.createElement('h3');
      title.className = 'course-title';
      title.textContent = repo.name;

      const description = document.createElement('p');
      description.className = 'course-description';
      description.textContent = repo.description;

      // Append elements to repository card
      card.appendChild(image);
      card.appendChild(title);
      card.appendChild(description);

      // Append repository card to grid
      grid.appendChild(card);
    });

    // Clear previous content and append the grid to the container
    repoListElement.innerHTML = '';
    repoListElement.appendChild(grid);
  })
  .catch(error => {
    console.log('Error:', error);
  });
