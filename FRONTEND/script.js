document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const birthDateInput = document.getElementById('birth-date');
    const fetchBtn = document.getElementById('fetch-btn');
    const resultArea = document.getElementById('result-area');
    const loader = document.getElementById('loader');

    const apodTitle = document.getElementById('apod-title');
    const mediaContainer = document.getElementById('media-container');
    const apodExplanation = document.getElementById('apod-explanation');
    const apodDate = document.getElementById('apod-date');

    // Ensure loader is hidden on start
    if (loader) {
        loader.classList.add('hidden');
        loader.style.opacity = '0';
    }

    // Set max date to today
    const today = new Date().toISOString().split('T')[0];
    birthDateInput.max = today;

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const date = birthDateInput.value;
        if (!date) {
            triggerInputError();
            return;
        }

        prepareUIForLoading();

        try {
            // Using a timeout to prevent absolute "infinite" wait if fetch hangs
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

            const response = await fetch(`http://localhost:5000/api/apod?date=${date}`, { signal: controller.signal });
            clearTimeout(timeoutId);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Falha na conexão orbital.');
            }

            await displayAPOD(data);
        } catch (error) {
            console.error('Cosmic Error:', error);
            showErrorUI(error.name === 'AbortError' ? 'O Comando Estelar demorou muito a responder. Tente novamente.' : error.message);
            hideLoader();
        }
    });

    function prepareUIForLoading() {
        if (loader) {
            loader.classList.remove('hidden');
            loader.style.opacity = '1';
            loader.style.pointerEvents = 'all';
        }
        if (fetchBtn) {
            fetchBtn.disabled = true;
            fetchBtn.style.opacity = '0.5';
        }
        resultArea.classList.add('hidden');
    }

    function hideLoader() {
        if (loader) {
            loader.style.opacity = '0';
            loader.style.pointerEvents = 'none';
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 300);
        }
        if (fetchBtn) {
            fetchBtn.disabled = false;
            fetchBtn.style.opacity = '1';
        }
    }

    async function displayAPOD(data) {
        apodTitle.textContent = data.title;
        apodExplanation.textContent = data.explanation;
        apodDate.textContent = formatDate(data.date);

        mediaContainer.innerHTML = '';

        if (data.media_type === 'image') {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = data.url;
                img.alt = data.title;
                img.onload = () => {
                    mediaContainer.appendChild(img);
                    revealResult();
                    hideLoader();
                    resolve();
                };
                img.onerror = () => {
                    showErrorUI("Erro ao carregar imagem estelar.");
                    hideLoader();
                    resolve();
                };
            });
        } else if (data.media_type === 'video') {
            const iframe = document.createElement('iframe');
            iframe.src = data.url;
            iframe.frameBorder = '0';
            iframe.allowFullscreen = true;
            mediaContainer.appendChild(iframe);
            revealResult();
            hideLoader();
        } else {
            revealResult();
            hideLoader();
        }
    }

    function revealResult() {
        resultArea.classList.remove('hidden');
        setTimeout(() => {
            resultArea.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }

    function triggerInputError() {
        const wrapper = document.querySelector('.search-experience');
        if (wrapper) {
            wrapper.style.borderColor = '#ff4444';
            wrapper.style.boxShadow = '0 0 40px rgba(255, 68, 68, 0.2)';
            setTimeout(() => {
                wrapper.style.borderColor = '';
                wrapper.style.boxShadow = '';
            }, 1000);
        }
    }

    function showErrorUI(msg) {
        alert(`Alerta do Comando Estelar: ${msg}`);
    }

    function formatDate(dateStr) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateStr).toLocaleDateString('pt-BR', options);
    }
});
