import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    name: '',
    prompt: location.state?.prompt || '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [generatingMsg, setGeneratingMsg] = useState(false);
  const [sharingImg, setSharingImg] = useState(false);
  const [toast, setToast] = useState(null);
  const [generatedPrompt, setGeneratedPrompt] = useState(location.state?.prompt || '');

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleFieldChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/v1/image`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        if (!response.ok) throw new Error('Failed to generate image');

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
        setGeneratedPrompt(form.prompt);
      } catch (err) {
        showToast(err.message || 'Failed to generate image');
      } finally {
        setGeneratingImg(false);
      }
    } else {
      showToast('Please provide a prompt');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name) {
      showToast('Please enter your name');
      return;
    }

    if (form.prompt && form.photo) {
      setSharingImg(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/v1/post`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        showToast('Image shared successfully!', 'success');
        setTimeout(() => navigate('/'), 1500);
      } catch (err) {
        showToast(err.message || 'Failed to share image');
      } finally {
        setSharingImg(false);
      }
    } else {
      showToast('Please generate an image first');
    }
  };

  const generatingMessages = [
    'Generating your image...',
    'Painting the details...',
    'Mixing colors and textures...',
    'Adding finishing touches...',
    'Almost there...',
    'Just a little longer...',
  ];

  useEffect(() => {
    if (!generatingImg) return;
    setGeneratingMsg(generatingMessages[0]);
    let i = 1;
    const interval = setInterval(() => {
      setGeneratingMsg(generatingMessages[i % generatingMessages.length]);
      i++;
    }, 5000);
    return () => clearInterval(interval);
  }, [generatingImg]);

  return (
    <section className="max-w-7xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-1.5 text-gray-500 hover:text-white text-sm transition-colors mb-6">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Browse gallery
      </Link>

      <div>
        <h1 className="font-extrabold text-white text-[40px] leading-tight tracking-tight">Create <span className="bg-gradient-to-r from-[#6469ff] to-[#a855f7] bg-clip-text text-transparent">& Share</span></h1>
        <p className="mt-3 text-gray-300 text-[15px] leading-relaxed">Generate an imaginative image through Picasso AI and share it with the community</p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleFieldChange}
          />

          <div>
            <FormField
              labelName="Prompt"
              type="text"
              name="prompt"
              placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
              value={form.prompt}
              handleChange={handleFieldChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
              maxLength={500}
            />
            <p className={`mt-1.5 text-xs text-right ${form.prompt.length > 450 ? 'text-red-400' : 'text-gray-200'}`}>
              {form.prompt.length} / 500
            </p>
          </div>

          <div className="relative bg-[#1a1a2e] border border-[#2a2a3e] text-gray-400 text-sm rounded-lg w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-90 invert"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5">
          <button
            type="button"
            onClick={generateImage}
            disabled={generatingImg}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:cursor-not-allowed"
          >
            <span className={generatingImg ? 'animate-pulse' : ''}>
              {generatingImg ? generatingMsg : (form.photo && form.prompt === generatedPrompt) ? 'Regenerate' : 'Generate'}
            </span>
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-gray-400 text-[14px] leading-relaxed font-bold">Once you have created the image you want, you can share it with others in the community</p>
          <button
            type="submit"
            disabled={sharingImg}
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sharingImg ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
      {toast && (
        <div className={`fixed bottom-6 right-6 px-5 py-3 rounded-lg shadow-lg text-sm font-medium text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-500'}`}>
          {toast.message}
        </div>
      )}
    </section>
  );
};

export default CreatePost;