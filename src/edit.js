import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, PanelBody, TextControl } from '@wordpress/components';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
    const { imagenes, textos, urls } = attributes;

    const seleccionarImagenes = (nuevasImagenes) => {
        setAttributes({
            imagenes: nuevasImagenes.map(imagen => ({
                url: imagen.url
            }))
        });
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
            {imagenes.length < 5 && (
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={seleccionarImagenes}
                        allowedTypes={['image']}
                        multiple
                        gallery
                        value={imagenes.map(imagen => imagen.url)}
                        render={({ open }) => (
                            <Button onClick={open}>
                                {imagenes.length > 0 ? 'Agregar más imágenes' : 'Agregar Imágenes'}
                            </Button>
                        )}
                    />
                </MediaUploadCheck>
            )}
        </div>
    );
}
