import styled from 'styled-components';

const colors = [
  '#9a00b3',
  '#633BBC',
  '#4f46e5',
  '#0088b3',
  '#07847e',
  '#16a34a',
  '#B38C00',
  '#ea580c',
  '#e11d48',
];

function getRandomColor() {
  const index = Math.round(Math.random() * (colors.length - 1));

  return colors[index];
}

function getColor(index?: number) {
  if (index !== 0 && !index) {
    return getRandomColor();
  }

  const colorsCount = colors.length - 1;

  const colorIndex = index % colorsCount;

  return colors[colorIndex];
}

export const Container = styled.ol`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 56px;
`;

export const ContactsGroup = styled.li`
  display: flex;
  gap: 52px;
`;

type ContactsGroupTitleProps = {
  titleIndex?: number;
};

export const ContactsGroupTitle = styled.p<ContactsGroupTitleProps>`
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  width: 40px;
  min-width: 40px;
  height: 40px;
  background-color: ${({ titleIndex }) => getColor(titleIndex)};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
`;

export const ContactsGroupList = styled.ol`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
`;

export const ContactItem = styled.li``;

export const EditContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const EditContactFormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
