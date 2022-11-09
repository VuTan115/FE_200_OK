import { useSelectedLayoutSegment } from 'next/navigation';
import SrcIcons from '@/assets/icons';
import { SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Input } from 'antd';
import type { SelectProps } from 'antd/es/select';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
export interface INavBarProps {
  data?: 'TODO:Change me';
}
const menuItems = [
  {
    name: 'Viết bài',
    hideOnMobile: true,
    url: '/tao-bai-viet',
    iconUrl: '',
    yieldName: '',
  },
  {
    name: 'Bài đã đăng',
    hideOnMobile: true,
    url: '/bai-dang',
    iconUrl: '',
    yieldName: '',
  },
  // {
  //   name: 'Đang theo dõi',
  //   hideOnMobile: true,
  //   url: '#',
  //   iconUrl: '',
  //   yieldName: '',
  // },
  {
    name: 'Gợi ý',
    hideOnMobile: true,
    url: '/goi-y',
    iconUrl: '',
    yieldName: '',
  },
  // {
  //   name: 'Các bài đã viết',
  //   hideOnMobile: true,
  //   url: '/bai-viet-cua-toi',
  //   iconUrl: '',
  //   yieldName: '',
  // },
  // {
  //   name: 'Tag',
  //   hideOnMobile: true,
  //   url: '#',
  //   iconUrl: '',
  //   yieldName: '',
  // },

  // {
  //   name: 'Bài đã lưu',
  //   hideOnMobile: true,
  //   url: '#',
  //   iconUrl: '',
  //   yieldName: '',
  // },
];
const getRandomInt = (max: number, min = 0) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const searchResult = (query: string) =>
  new Array(getRandomInt(5))
    .join('.')
    .split('.')
    .map((_, idx) => {
      const category = `${query}${idx}`;
      return {
        value: category,
        label: (
          <div
            key={category}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>
              Found {query} on{' '}
              <a href={`/search?q=${query}`} target="_blank" rel="noopener noreferrer">
                {category}
              </a>
            </span>
            <span>{getRandomInt(200, 100)} results</span>
          </div>
        ),
      };
    });

export function NavBar(props: INavBarProps) {
  const [options, setOptions] = useState<SelectProps<object>['options']>([]);
  const router = useRouter();
  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value) : []);
  };
  const onSelect = (value: string) => {
    console.log('onSelect', value);
  };
  const activeClassName = (path) => {
    const currentPath = router.pathname;
    if (path.includes('http')) {
      return;
    }
    console.log(currentPath);
    if (currentPath.split('/')[1] === path.split('/')[1]) {
      return 'active';
    }
  };
  return (
    <nav className="fixed w-full bg-white h-[var(--height-navbar)] shadow-[inset_0px_-1px_0px_#E2E2EA] px-5 z-[var(--nav-bar-zindex)] ">
      <div className="flex w-full  justify-between items-center gap-5">
        <div className="flex">
          <Link href="/" legacyBehavior>
            <div className="logo relative h-[var(--height-navbar)] w-full min-w-[165px] flex items-center align-middle justify-center gap-3">
              <Image width={32} height={32} src={SrcIcons.iconLogo} alt="cookies" />
              <h1 className="text-[26px] font-[500] cursor-pointer">Cookies</h1>
            </div>
          </Link>
        </div>

        <div className="flex w-full gap-4 my-auto flex-row justify-end items-center">
          <div className="flex gap-6 mr-auto ml-5">
            {menuItems.map((item) => (
              <Link href={item.url}>
                <span
                  className={clsx(
                    'text-[16px] whitespace-nowrap',
                    activeClassName(item.url) === 'active' && 'text-[#ffbc58]'
                  )}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
          <AutoComplete
            dropdownMatchSelectWidth={252}
            style={{ width: 300 }}
            options={options}
            onSelect={onSelect}
            onSearch={handleSearch}
          >
            <Input
              size="large"
              placeholder="Tìm kiếm"
              suffix={<SearchOutlined />}
              className="max-w-[300px]"
            />
          </AutoComplete>
          <Link href="/sign-up" legacyBehavior>
            <Button type="primary" size="large">
              Đăng ký
            </Button>
          </Link>
          <Link href="/login" legacyBehavior>
            <Button type="primary" size="large">
              Đăng nhập
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
