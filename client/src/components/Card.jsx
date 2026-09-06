import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { download } from '../assets';
import { downloadImage } from '../utils';

const Card = ({ _id, name, prompt, photo }) => {
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyPrompt = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const usePrompt = (e) => {
    e.stopPropagation();
    navigate('/create-post', { state: { prompt } });
  };

   useEffect(() => {
    if (!lightbox) return;
    const handler = (e) => { if (e.key === 'Escape') setLightbox(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox]);

  return (
    <>
      <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
        <div className="aspect-square w-full overflow-hidden rounded-xl cursor-pointer" onClick={() => setLightbox(true)}>
          <img className="w-full h-full object-cover" src={photo} alt={prompt} />
        </div>
        <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
          <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={copyPrompt}
              className="flex-1 text-xs py-1.5 rounded-md bg-[#2a2a3e] text-gray-300 hover:text-white hover:bg-[#3a3a5e] transition-colors"
            >
              {copied ? 'Copied!' : 'Copy prompt'}
            </button>
            <button
              type="button"
              onClick={usePrompt}
              className="flex-1 text-xs py-1.5 rounded-md bg-gradient-to-r from-[#6469ff] to-[#a855f7] text-white hover:opacity-90 transition-opacity"
            >
              Use this prompt
            </button>
          </div>

          <div className="mt-3 flex justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">{name?.[0] ?? '?'}</div>
              <p className="text-white text-sm">{name}</p>
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); downloadImage(_id, photo); }}
              className="outline-none bg-transparent border-none"
            >
              <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
            </button>
          </div>
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightbox(false)}
        >
          <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <img src={photo} alt={prompt} className="w-full rounded-xl max-h-[75vh] object-contain" />
            <p className="mt-4 text-gray-300 text-sm text-center leading-relaxed">{prompt}</p>
            <button
              className="mt-4 mx-auto block text-gray-500 hover:text-white text-sm transition-colors"
              onClick={() => setLightbox(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;