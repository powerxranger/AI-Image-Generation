import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [sharingImg, setSharingImg] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'error') => {
    setToast({message, type});
    setTimeout(() => setToast(null), 3000);
  };

  const handleFieldChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (!form.name) {
      showToast('Please enter your name');
      return;
    }

    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(`${import.meta.env.SERVER_URL || 'http://localhost:8080'}/api/v1/image`, {
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
      } catch (err) {
        showToast(err.message || 'Failed to generate image');
      } finally {
        setGeneratingImg(false);
      }
    } else {
      showToast('Please provide proper prompt');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setSharingImg(true);
      try {
        const response = await fetch(`${import.meta.env.SERVER_URL || 'http://localhost:8080'}/api/v1/post`, {
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

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-white text-[40px] leading-tight tracking-tight">Create <span className="bg-gradient-to-r from-[#6469ff] to-[#a855f7] bg-clip-text text-transparent">& Share</span></h1>
        <p className="mt-3 text-gray-300 text-[15px] leading-relaxed">Generate an imaginative image through Picasso AI and share it with the community</p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleFieldChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleFieldChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-[#1a1a2e] border border-[#2a2a3e] text-gray-400 text-sm rounded-lg w-64 p-3 h-64 flex justify-center items-center">
            { form.photo ? (
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

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            disabled={generatingImg}
            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
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
      {
        toast && (
          <div className={`fixed bottom-6 right-6 px-5 py-3 rounded-lg shadow-lg text-sm font-medium text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-500'}`}>
            {toast.message}
          </div>
        )
      }
    </section>
  );
};

export default CreatePost;
