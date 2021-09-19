import { useMemo, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { DOMContext as DOMContextImpl, DOMElement as DOMElementImpl } from '.';

const context = createContext(null);

export const useDOMContext = () => {
  const state = useContext(context);
  if (!state) throw `DOM hooks can only be used within the DOMContext component!`;
  return state;
};

export const DOMElement = ({ children, elementWidth, width, height }) => {
  const state = useThree();
  const { context } = useDOMContext();

  useEffect(() => {
    if (!children) return;

    const elements = [];

    const parseChild = (child, parent) => {
      if (Array.isArray(child)) return child.forEach(parseChild);

      const element = document.createElement(child?.type || 'textNode');
      Object.entries(child?.props)?.forEach(([key, value]) => {
        if (key === 'children') {
          parseChild(value, element);
        } else {
          element[key] = value;
        }
      });

      if (parent) {
        parent.appendChild(element);
      } else {
        const threeElement = new DOMElementImpl(context, element, {
          elementWidth,
          width,
          height,
        });
        state.scene.add(threeElement);
        elements.push(threeElement);
      }
    };

    parseChild(children);

    return () => {
      elements.forEach(element => {
        state.scene.remove(element);
        element.dispose();
      });
    };
  }, [children, context, state.scene, elementWidth, width, height]);

  return <div style={{ display: 'none' }}>{children}</div>;
};

export const DOMContext = ({ camera, children, ...rest }) => {
  const state = useThree();
  const object = useMemo(
    () => new DOMContextImpl(camera || state.camera),
    [camera, state.camera]
  );

  return (
    <context.Provider value={{ context: object }}>
      <div ref={ref => (ref.current = object.domElement)} {...rest} />
      {children && <DOMElement>{children}</DOMElement>}
    </context.Provider>
  );
};
