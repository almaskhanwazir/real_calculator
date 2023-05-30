export default function EmbeddDialogue({ onClose, content }) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="absolute top-0 left-0 w-full h-full bg-gray-500 opacity-75"></div>
        <div className="absolute bg-white rounded-lg w-1/2">
          <div className="border-b-2 p-4">
            <h3 className="font-semibold">Embedded Link</h3>
          </div>
          <div className="p-4">
          <textarea value={content} className="w-full h-32 border border-gray-400 rounded p-2" disabled={true}></textarea>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  }