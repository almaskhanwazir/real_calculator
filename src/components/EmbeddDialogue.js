export default function EmbeddDialogue({ onClose, content }) {
    return (
      <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center">
        <div class="absolute top-0 left-0 w-full h-full bg-gray-500 opacity-75"></div>
        <div class="absolute bg-white rounded-lg w-1/2">
          <div class="border-b-2 p-4">
            <h3 class="font-semibold">Embedded Link</h3>
          </div>
          <div class="p-4">
          <textarea value={content} className="w-full h-32 border border-gray-400 rounded p-2" disabled={true}></textarea>
            
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  }