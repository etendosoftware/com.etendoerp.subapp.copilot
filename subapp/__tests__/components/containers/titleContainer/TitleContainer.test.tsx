import React from 'react';
import { render, screen } from '@testing-library/react-native';
import TitleContainer from '../../../../src/components/containers/titleContainer/TitleContainer';
import { Text } from 'react-native';

describe('TitleContainer', () => {
  // Mock básico de los botones
  const mockButtons = [
    <Text key="button1">Botón 1</Text>,
    <Text key="button2">Botón 2</Text>
  ];

  it('renderiza el título correctamente', () => {
    const title = 'Mi Título';
    render(
      <TitleContainer
        title={title}
        buttons={mockButtons}
      />
    );

    expect(screen.getByText(title)).toBeTruthy();
  });

  it('renderiza los botones correctamente', () => {
    render(
      <TitleContainer
        title="Título"
        buttons={mockButtons}
      />
    );

    expect(screen.getByText('Botón 1')).toBeTruthy();
    expect(screen.getByText('Botón 2')).toBeTruthy();
  });

  it('aplica los estilos personalizados al contenedor', () => {
    const customStyle = { backgroundColor: 'red' };
    const { toJSON } = render(
      <TitleContainer
        title="Título"
        buttons={mockButtons}
        styleContainer={customStyle}
      />
    );

    const rootElement = toJSON();
    const styles = rootElement.props.style;
    // Verificamos que el estilo personalizado está incluido en el array de estilos
    expect(styles).toEqual(
      expect.arrayContaining([
        expect.objectContaining(customStyle)
      ])
    );
  });

  it('aplica los estilos personalizados al título', () => {
    const titleStyle = { color: 'blue' };
    render(
      <TitleContainer
        title="Título"
        buttons={mockButtons}
        styleTitle={titleStyle}
      />
    );

    const titleElement = screen.getByText('Título');
    expect(titleElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining(titleStyle)
      ])
    );
  });

  it('aplica los estilos del grid container correctamente', () => {
    const gridStyle = { padding: 10 };
    const { UNSAFE_root } = render(
      <TitleContainer
        title="Título"
        buttons={mockButtons}
        styleGridContainer={gridStyle}
      />
    );
    
    // Buscamos el componente GridContainer que contiene los botones
    const gridContainers = UNSAFE_root.findAll(node => 
      node.props && node.props.components === mockButtons
    );
    expect(gridContainers[0].props.stylesContainer).toEqual(gridStyle);
  });

  it('aplica los gaps horizontal y vertical correctamente', () => {
    const horizontalGap = 10;
    const verticalGap = 20;
    
    const { UNSAFE_root } = render(
      <TitleContainer
        title="Título"
        buttons={mockButtons}
        gridGapHorizontal={horizontalGap}
        gridGapVertical={verticalGap}
      />
    );

    // Buscamos el componente GridContainer que contiene los botones
    const gridContainers = UNSAFE_root.findAll(node => 
      node.props && node.props.components === mockButtons
    );
    const buttonGridContainer = gridContainers[0];
    
    expect(buttonGridContainer.props.gapHorizontal).toBe(horizontalGap);
    expect(buttonGridContainer.props.gapVertical).toBe(verticalGap);
  });

  it('trunca el título cuando es demasiado largo', () => {
    const longTitle = 'Este es un título muy largo que debería ser truncado al final';
    render(
      <TitleContainer
        title={longTitle}
        buttons={mockButtons}
      />
    );

    const titleElement = screen.getByText(longTitle);
    expect(titleElement.props.numberOfLines).toBe(1);
    expect(titleElement.props.ellipsizeMode).toBe('tail');
  });
});