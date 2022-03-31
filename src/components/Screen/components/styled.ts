import styled from '@emotion/styled'

export const Grid = styled.div`
  display: grid;
  max-width: 1680px;
  height: 100%;
  margin: auto;
  padding: 32px 0;
  grid-template-columns: repeat(
    var(--grid-item-count),
    minmax(var(--grid-item-width), 1fr)
  );
  grid-template-rows: repeat(auto-fit, minmax(var(--grid-item-height), 1fr));
  grid-gap: var(--grid-gap);
  align-items: center;
  justify-self: center;
`
