import React, { useState, useEffect, useRef } from 'react';
import { useField } from '@rocketseat/unform';
import { MdCameraAlt } from 'react-icons/md';

import { Container } from './styles';
import api from '~/services/api';

export default function BannerInput({ error }) {
  const { defaultValue, registerField } = useField('file');

  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const [file, setFile] = useState(defaultValue && defaultValue.id);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'banner_id',
        ref: ref.current,
        path: 'dataset.file',
      })
    }
  }, [ref.current]);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);
    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container error={error}>
      <label htmlFor="banner">
        {preview ? (
          <img src={preview} alt="Imagem" />
        )
        : (
          <>
            <MdCameraAlt size={60} color="#fff" />
            <span>Selecionar imagem</span>
          </>
        )}

        <input
          type="file"
          id="banner"
          accept="image/*"
          onChange={handleChange}
          data-file={file}
          ref={ref}
        />
      </label>
    </Container>
  );
}
