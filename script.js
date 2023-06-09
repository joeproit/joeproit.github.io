fetch('https://api.github.com/users/joeproit/repos')
  .then(response => response.json())
  .then(data => {
    // Sort repositories by last updated date (descending order)
    const sortedRepos = data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    // Get the last 4 updated repositories
    const last4Repos = sortedRepos.slice(0, 9);

    // Generate the HTML for repository cards
    const repoListElement = document.getElementById('repoList');
    const section = document.createElement('section');
    section.className = 'featured-courses bg-gray-200 py-16';

    const container = document.createElement('div');
    container.className = 'container mx-auto px-4';

    const sectionTitle = document.createElement('h2');
    sectionTitle.className = 'text-3xl font-bold mb-8';
    sectionTitle.textContent = 'Repositories';

    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8';

    last4Repos.forEach(repo => {
      // Create repository card link
      const cardLink = document.createElement('a');
      cardLink.href = repo.html_url;
      cardLink.target = '_blank';

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

      const lastUpdated = document.createElement('p');
      lastUpdated.className = 'course-last-updated';
      lastUpdated.textContent = 'Last Updated: ' + new Date(repo.updated_at).toLocaleDateString();

      // Append elements to repository card
      card.appendChild(image);
      card.appendChild(title);
      card.appendChild(description);
      card.appendChild(lastUpdated);

      // Append repository card to link
      cardLink.appendChild(card);

      // Append link to grid
      grid.appendChild(cardLink);
    });

    // Append section title, grid, and container to section
    container.appendChild(sectionTitle);
    container.appendChild(grid);
    section.appendChild(container);

    // Clear previous content and append the section to the repository list element
    repoListElement.innerHTML = '';
    repoListElement.appendChild(section);
  })
  .catch(error => {
    console.log('Error:', error);
  });
