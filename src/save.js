import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { imagenes, textos, urls } = attributes;

    return (
        <div {...useBlockProps.save()}>
            {imagenes.map((imagen, index) => (
                <div key={index} className={`imagen-contenedor fondo-${index}`}>
                    <div className="contenedor-circular">
                        <img key={index} src={imagen.url} style={{ margin: '10px' }} className={`imagenind-${index}`} />
                    </div>
                    <p>{textos[index]}</p>
                    <a href={urls[index]} className="components-button">VER MÁS</a>
                </div>
            ))}
        </div>
    );
}
