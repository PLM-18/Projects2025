<template>
<div class="home">
    <div class="container">
        <h1>File Manager</h1>
        
        <div class="tabs">
            <div class="tab active" data-tab="upload">Upload</div>
            <div class="tab" data-tab="list">List Files</div>
        </div>
        
        <div class="tab-content active" id="upload">
            <div class="upload-area">
                <h2>Upload File</h2>
                <div class="drop-area" id="dropArea">
                    <p>Drag & drop files here</p>
                    <p>- OR -</p>
                    <div class="file-input-container">
                        <button class="btn">Choose File</button>
                        <input type="file" class="file-input" id="fileInput">
                    </div>
                    <p class="file-info" id="fileInfo"></p>
                </div>
                
                <h2>Or paste text content</h2>
                <textarea class="text-area" id="textContent" placeholder="Paste your text here..."></textarea>
                
                <div>
                    <label for="fileName">File Name:</label>
                    <input type="text" id="fileName" placeholder="Enter file name">
                </div>
                
                <button class="btn" id="uploadBtn">Upload</button>
            </div>
        </div>
        
        <div class="tab-content" id="list">
            <h2>Uploaded Files</h2>
            <table class="file-list">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Upload Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="fileListBody">
                    <!-- Files will be added here dynamically -->
                </tbody>
            </table>
        </div>
    </div>
    
    <div id="viewModal" class="modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2 id="modalFileName"></h2>
            <pre id="fileContent"></pre>
        </div>
    </div>
</div>
</template>
  
  <script>
  export default {
    name: 'HomePage',
    mounted() {
        const tabs = document.querySelectorAll('.tab');
        const tabContents = document.querySelectorAll('.tab-content');
        const dropArea = document.getElementById('dropArea');
        const fileInput = document.getElementById('fileInput');
        const fileInfo = document.getElementById('fileInfo');
        const textContent = document.getElementById('textContent');
        const fileName = document.getElementById('fileName');
        const uploadBtn = document.getElementById('uploadBtn');
        const fileListBody = document.getElementById('fileListBody');
        const viewModal = document.getElementById('viewModal');
        const modalFileName = document.getElementById('modalFileName');
        const fileContent = document.getElementById('fileContent');
        const closeModal = document.querySelector('.close-modal');
        
        // Files storage (in memory for demo purposes)
        // In a real application, this would be synchronized with your server
        let files = [];
        
        // Load files from localStorage if available
        if (localStorage.getItem('uploadedFiles')) {
            try {
                files = JSON.parse(localStorage.getItem('uploadedFiles'));
                renderFileList();
            } catch (e) {
                console.error("Error loading files from localStorage", e);
                localStorage.removeItem('uploadedFiles');
            }
        }
        
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
        
        fileInput.addEventListener('change', function() {
            if (this.files.length) {
                const file = this.files[0];
                fileInfo.textContent = `Selected: ${file.name} (${formatFileSize(file.size)})`;
                fileName.value = file.name;
                
                if (file.type.startsWith('text/') || file.type === 'application/json') {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        textContent.value = event.target.result;
                    };
                    reader.readAsText(file);
                } else {
                    textContent.value = '';
                }
            }
        });
        
        // Drag and drop handling
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, () => {
                dropArea.classList.add('active');
            });
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, () => {
                dropArea.classList.remove('active');
            });
        });
        
        dropArea.addEventListener('drop', handleDrop);
        
        function handleDrop(e) {
            const dt = e.dataTransfer;
            const file = dt.files[0];
            
            if (file) {
                fileInput.files = dt.files;
                fileInfo.textContent = `Selected: ${file.name} (${formatFileSize(file.size)})`;
                fileName.value = file.name;
                
                // Read file content for text files
                if (file.type.startsWith('text/') || file.type === 'application/json') {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        textContent.value = event.target.result;
                    };
                    reader.readAsText(file);
                } else {
                    textContent.value = '';
                }
            }
        }
        
        // Upload button click
        uploadBtn.addEventListener('click', function() {
            let content;
            let fileSize = 0;
            let name = fileName.value.trim();
            
            if (!name) {
                alert('Please enter a file name');
                return;
            }
            
            if (fileInput.files.length) {
                const file = fileInput.files[0];
                content = textContent.value;
                fileSize = file.size;
                
                if (!content) {
                    // For binary files, we would need to handle them differently
                    // Here we'll just use a placeholder
                    content = "[Binary content]";
                }
            } else if (textContent.value.trim()) {
                content = textContent.value;
                fileSize = new Blob([content]).size;
            } else {
                alert('Please select a file or enter text content');
                return;
            }
            
            // Create file object
            const newFile = {
                id: Date.now().toString(),
                name: name,
                size: fileSize,
                date: new Date().toISOString(),
                content: content
            };
            
            // Add to files array
            files.push(newFile);
            
            // Save to localStorage
            localStorage.setItem('uploadedFiles', JSON.stringify(files));
            
            // Update file list
            renderFileList();
            
            // Clear form
            fileInput.value = '';
            textContent.value = '';
            fileName.value = '';
            fileInfo.textContent = '';
            
            // Switch to list tab
            tabs[1].click();
            
            // Show success message
            alert(`File "${name}" uploaded successfully!`);
        });
        
        // Render file list
        function renderFileList() {
            fileListBody.innerHTML = '';
            
            if (files.length === 0) {
                const tr = document.createElement('tr');
                tr.innerHTML = '<td colspan="4">No files uploaded yet</td>';
                fileListBody.appendChild(tr);
                return;
            }
            
            files.forEach(file => {
                const tr = document.createElement('tr');
                
                tr.innerHTML = `
                    <td>${file.name}</td>
                    <td>${formatFileSize(file.size)}</td>
                    <td>${formatDate(file.date)}</td>
                    <td class="file-actions">
                        <button class="btn btn-view" data-id="${file.id}">View</button>
                        <button class="btn btn-delete" data-id="${file.id}">Delete</button>
                    </td>
                `;
                
                fileListBody.appendChild(tr);
            });
            
            // Add event listeners to buttons
            document.querySelectorAll('.btn-view').forEach(btn => {
                btn.addEventListener('click', function() {
                    const fileId = this.getAttribute('data-id');
                    viewFile(fileId);
                });
            });
            
            document.querySelectorAll('.btn-delete').forEach(btn => {
                btn.addEventListener('click', function() {
                    const fileId = this.getAttribute('data-id');
                    deleteFile(fileId);
                });
            });
        }
        
        // View file
        function viewFile(fileId) {
            const file = files.find(f => f.id === fileId);
            
            if (file) {
                modalFileName.textContent = file.name;
                fileContent.textContent = file.content;
                viewModal.style.display = 'block';
            }
        }
        
        // Delete file
        function deleteFile(fileId) {
            if (confirm('Are you sure you want to delete this file?')) {
                files = files.filter(f => f.id !== fileId);
                
                // Save to localStorage
                localStorage.setItem('uploadedFiles', JSON.stringify(files));
                
                // Update file list
                renderFileList();
            }
        }
        
        // Close modal
        closeModal.addEventListener('click', function() {
            viewModal.style.display = 'none';
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === viewModal) {
                viewModal.style.display = 'none';
            }
        });
        
        // Helper functions
        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }
        
        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleString();
        }
        
        renderFileList();
    }
}
  </script>
  
<style scoped>
    @import "../styles/Home.css";
</style>