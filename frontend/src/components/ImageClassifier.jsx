import React, { useState } from 'react';

const ImageClassifier = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('http://localhost:8000/classify', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error('Gagal mengklasifikasi gambar:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border">
            <h2 className="text-2xl font-bold text-center mb-4">Klasifikasi Gambar</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="border p-2 rounded"
                />
                {preview && (
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-40 h-40 object-contain self-center border rounded"
                    />
                )}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    {loading ? 'Mengklasifikasi...' : 'Klasifikasi'}
                </button>
            </form>

            {result && (
                <div className="mt-4 p-4 bg-gray-100 rounded shadow">
                    <h3 className="font-semibold">Hasil:</h3>
                    <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default ImageClassifier;
