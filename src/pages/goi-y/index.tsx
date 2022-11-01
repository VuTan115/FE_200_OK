import CreateSugesstionModule from '@/modules/SugesstionRecipe/pages/Create';
import React from 'react';

type Props = {
  data?: any;
};

const SugesstionPage = (props: Props) => {
  return (
    <div>
      <CreateSugesstionModule />
    </div>
  );
};

export default SugesstionPage;
