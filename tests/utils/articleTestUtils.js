import {
  HEALING_CATEGORY,
  FORMAT_1,
} from '../../src/utils/articleUtils/articleContextUtils';

const validArticleDTO = (file) => ({
  title: 'Test article',
  description:
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
  content:
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
  file,
  category: HEALING_CATEGORY,
  format: FORMAT_1,
});

// eslint-disable-next-line import/prefer-default-export
export { validArticleDTO };
