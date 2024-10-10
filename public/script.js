document.getElementById('shirtForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Mostra a barra de progresso
    const progressBar = document.getElementById('progressBar');
    const progressContainer = document.getElementById('progressContainer');
    progressContainer.style.display = 'block';
    progressBar.style.width = '0%';  // Reinicia a barra de progresso

    // Simula o avanço da barra de progresso
    let progress = 0;
    const interval = setInterval(() => {
        if (progress >= 100) {
            clearInterval(interval);
        } else {
            progress += 10;
            progressBar.style.width = `${progress}%`;
        }
    }, 100);

    // Enviar dados ao servidor
    fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
        clearInterval(interval);
        progressBar.style.width = '100%';  // Preenche a barra de progresso

        // Exibe a tela de confirmação
        if (response.success) {
            if (data.payment === 'Pix') {
                window.location.href = '/pix-confirmation.html';
            } else {
                showConfirmation();
            }
        } else {
            showNotification('Erro ao enviar pedido.', 'error');
        }
    })
    .catch(error => {
        clearInterval(interval);
        showNotification('Erro ao conectar ao servidor.', 'error');
        progressContainer.style.display = 'none';  // Oculta a barra de progresso
    });
});

// Função para exibir a página de confirmação após o pedido ser enviado com sucesso
function showConfirmation() {
    const confirmationHTML = `
        <h1>Pedido Confirmado!</h1>
        <p>Obrigado por realizar seu pedido. Nos veremos em breve para entregar sua blusa.</p>
    `;
    document.body.innerHTML = confirmationHTML;
}

// Função para exibir notificações
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Função para trocar a imagem de acordo com o tipo de camisa selecionada
document.getElementById('type').addEventListener('change', function() {
    const shirtImage = document.getElementById('shirtImage');
    if (this.value === 'Normal') {
        shirtImage.src = 'normal_tamanhos.jpg';
        shirtImage.alt = 'Imagem Normal';
    } else {
        shirtImage.src = 'babylook_tamanhos.jpg';
        shirtImage.alt = 'Imagem Babylook';
    }
});
