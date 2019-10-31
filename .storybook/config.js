import { configure } from '@storybook/react';
<<<<<<< HEAD

configure([
  require.context('../src/components', true, /\.stories\.js$/),
  require.context('../src/containers', true, /\.stories\.js$/)], module);

=======
configure([
  require.context('../src/components', true, /\.stories\.js$/),
  require.context('../src/containers', true, /\.stories\.js$/)
], module);
>>>>>>> d7d4c9120f26ef6683a3ccd23d3c3e3eff933806
