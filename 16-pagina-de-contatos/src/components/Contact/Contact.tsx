import { useState } from 'react';

import { Contact as ContactType } from '../../types/contact';

import { ContactInfo, Container, ImageContainer } from './Contact.styles';

type ContactProps = {
  data: ContactType;
};

export function Contact({ data: { imgUrl, name, phone } }: ContactProps) {
  const [imgError, setImgError] = useState(false);

  function handleImageError() {
    setImgError(true);
  }

  function getNameInitials() {
    const nameInitials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    return nameInitials;
  }

  return (
    <Container>
      <ImageContainer>
        {imgError ? (
          <p>{getNameInitials()}</p>
        ) : (
          <img
            src={imgUrl}
            alt="User Profile Image"
            onError={handleImageError}
          />
        )}
      </ImageContainer>

      <ContactInfo>
        <strong>{name}</strong>
        <span>{phone}</span>
      </ContactInfo>
    </Container>
  );
}
