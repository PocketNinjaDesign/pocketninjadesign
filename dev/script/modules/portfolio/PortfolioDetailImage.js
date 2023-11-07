import BreakPointService from '../../services/BreakPoint.service';

const getImageTemplateDefaultOptions = {
  filePrefix: '',
  imageSrcData: {},
  additionalClassName: '',
  imgClassName: '',
};

export default {
  getImageTemplate(newOptions) {
    const options = Object.assign({}, getImageTemplateDefaultOptions, newOptions);
    const prefix = options.filePrefix;
    const img = options.imageSrcData;

    const element = document.createElement('div');
    element.innerHTML = `<picture class="picture-box ${options.additionalClassName}">
      <source media="(min-width: 1600px)" srcset="${prefix}${img.large}">
      <source media="(min-width: ${BreakPointService.bpMedium}px)" srcset="${prefix}${img.medium}">
      <img src="${prefix}${img.small}" class="${options.imgClassName}">
    </picture>`;

    return element.firstChild;
  },
};
