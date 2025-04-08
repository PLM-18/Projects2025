<template>
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

  </template>
  
  <script>
  export default {
    name: 'HomePage'
  }
  </script>
  
<style scoped>
    @import "../styles/Home.css";
</style>