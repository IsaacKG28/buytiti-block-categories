import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, PanelBody, TextControl } from '@wordpress/components';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
    const { imagenes, textos, urls } = attributes;

    const seleccionarImagen = (nuevaImagen, index) => {
        const nuevasImagenes = [...imagenes];
        nuevasImagenes[index] = { url: nuevaImagen.url };
        setAttributes({ imagenes: nuevasImagenes });
    };

    const agregarImagen = (nuevaImagen) => {
        setAttributes({ imagenes: [...imagenes, { url: nuevaImagen.url }] });
    };

    return (
        <div { ...useBlockProps() }>
            <InspectorControls>
                <PanelBody title={ __( 'Textos del bloque', 'buytiti-bloque-categorias' ) }>
                    {textos.map((texto, index) => (
                        <TextControl
                            label={ `Texto ${index + 1}` }
                            value={ texto }
                            onChange={ ( nuevoTexto ) => {
                                const nuevosTextos = [...textos];
                                nuevosTextos[index] = nuevoTexto;
                                setAttributes({ textos: nuevosTextos });
                            } }
                        />
                    ))}
                </PanelBody>
                <PanelBody title={ __( 'URLs de los botones', 'buytiti-bloque-categorias' ) }>
                    {urls.map((url, index) => (
                        <TextControl
                            label={ `URL del botón ${index + 1}` }
                            value={ url }
                            onChange={ ( nuevaUrl ) => {
                                const nuevasUrls = [...urls];
                                nuevasUrls[index] = nuevaUrl;
                                setAttributes({ urls: nuevasUrls });
                            } }
                        />
                    ))}
                </PanelBody>
                <PanelBody title={ __( 'Imágenes', 'buytiti-bloque-categorias' ) }>
                    {imagenes.map((imagen, index) => (
                        <div>
                            <img src={imagen.url} alt={`Imagen ${index + 1}`} />
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(nuevaImagen) => seleccionarImagen(nuevaImagen, index)}
                                    allowedTypes={['image']}
                                    value={imagen.url}
                                    render={({ open }) => (
                                        <Button onClick={open}>
                                            Cambiar imagen
                                        </Button>
                                    )}
                                />
                            </MediaUploadCheck>
                        </div>
                    ))}
                    {imagenes.length < 6 && (
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={agregarImagen}
                                allowedTypes={['image']}
                                render={({ open }) => (
                                    <Button onClick={open}>
                                        Agregar imagen
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                    )}
                </PanelBody>
            </InspectorControls>
            {imagenes.map((imagen, index) => (
                <div key={index} className={`imagen-contenedor fondo-${index}`}>
                    <div className="contenedor-circular">
                        <img key={index} src={imagen.url} style={{ margin: '10px' }} className={`imagenind-${index}`} />
                    </div>
                    <p className={`texto-${index}`}>{textos[index]}</p>
                    <Button href={urls[index]}>VER MÁS</Button>
                </div>
            ))}
        </div>
    );
}
