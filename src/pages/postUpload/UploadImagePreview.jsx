import React from 'react';
import { PreviewWrapper, PreviewImage, DeleteButton } from './UploadImagePreview.style';

const UploadImagePreview = ({ src, onDelete }) => {
  return (
    <PreviewWrapper>
      <PreviewImage src={src} alt="preview" />
      <DeleteButton onClick={onDelete}>×</DeleteButton>
    </PreviewWrapper>
  );
};

export default UploadImagePreview;
