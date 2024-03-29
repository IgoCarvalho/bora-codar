import { useState } from 'react';

import { Contact as ContactType } from '../../types/contact';
import { useContacts } from '../../hooks/useContacts';

import { ContactInfo, Container, ImageContainer } from './Contact.styles';

type ContactProps = {
  data: ContactType;
  onClick?: (contact: ContactType) => void;
  disabled?: boolean;
};

export function Contact({ data, onClick, disabled }: ContactProps) {
  const [imgError, setImgError] = useState(false);

  const { isEditMode, isDeleteMode } = useContacts();

  function handleImageError() {
    setImgError(true);
  }

  function getNameInitials() {
    const nameInitials = data.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    return nameInitials;
  }

  function handleContactClick() {
    onClick && onClick(data);
  }

  return (
    <Container
      onClick={handleContactClick}
      isEditing={isEditMode && !disabled}
      isDeleting={isDeleteMode && !disabled}
    >
      <ImageContainer>
        {imgError ? (
          <p>{getNameInitials()}</p>
        ) : (
          <img
            src={data.imgUrl}
            alt="User Profile Image"
            onError={handleImageError}
          />
        )}
      </ImageContainer>

      <ContactInfo>
        <strong>{data.name}</strong>
        <span>{data.phone}</span>
      </ContactInfo>
    </Container>
  );
}
