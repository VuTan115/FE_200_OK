import { Avatar, Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ResponseSuggestion } from '../../api';

type Props = {
  suggestions: ResponseSuggestion[];
};

const Sugesstions = (props: Props) => {
  const { suggestions } = props;
  const [loading, setLoading] = useState(false);
  return (
    <div>
      {suggestions.map((item) => (
        <Card className="w-full" loading={loading} key={item.id}>
          <div className="flex justify-between">
            <Meta
              title={<Link href={`bai-dang/${item.id}`}>{item.title}</Link>}
              // description only has 200 characters max length
              description={
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.content.split(' ').slice(0, 20).join(' '),
                  }}
                ></div>
              }
            />
            <div className="relative h-[60px] w-[60px]">
              <Image
                fill
                sizes="100%"
                src={'https://joeschmoe.io/api/v1/random'}
                alt=""
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Sugesstions;
