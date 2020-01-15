export default {
    theme: 'modern',

    skin_url: '/tinymce/skins/lightgray',
    codesample_content_css: '/prism/prism.css',

    statusbar: false,
    autoresize_min_height: 500,

    language_url: '/tinymce/langs/zh_CN.js',

    plugins: `print preview searchreplace autolink directionality visualblocks visualchars help
    fullscreen image link media template codesample table charmap hr pagebreak nonbreaking textpattern 
    anchor toc insertdatetime advlist lists textcolor imagetools colorpicker autoresize`,

    toolbar: `formatselect | bold italic strikethrough forecolor backcolor | link image | 
    alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat`,

    image_uploadtab: true,
    images_upload_url: '/resource',
    // images_upload_base_path: '',

    codesample_languages: [
        {text: 'JavaScript', value: 'javascript'},
        {text: 'Java', value: 'java'},
        {text: 'JSON', value: 'json'},
        {text: 'Sass', value: 'sass'},
    ],

};
