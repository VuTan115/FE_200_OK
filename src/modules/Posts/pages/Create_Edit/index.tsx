import { message } from 'antd';
import { getQuestionRespose, questionAPI } from '@/modules/SugesstionRecipe/api';
import { appLibrary } from '@/shared/utils/loading';
import { Loading } from '@nextui-org/react';
import { Button, Form, Input, InputNumber, Radio, Select } from 'antd';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { CreatePostPayload, postAPI } from '../../api';
export enum CreatePostPayloadEnum {
  title = 'title',
  content = 'content',
  isReceipe = 'isReceipe',
  tagIds = 'tagIds',
  cookTime = 'cookTime',
}
const Editor = dynamic(() => import('@/components/Editor'), {
  ssr: false,
  loading: () => (
    <>
      <Loading />
      Khởi tạo trình soạn thảo văn bản...
    </>
  ),
});
type Props = {
  data?: CreatePostPayloadEnum;
};

const CreateEditPostModule = (props: Props) => {
  const getTags = async () => {
    const { data } = await questionAPI.getQuestions(5);
    return data;
  };
  const [tags, setTags] = useState<getQuestionRespose[]>([]);
  const { data } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data]);
  useEffect(() => {
    getTags().then((res) => {
      setTags(res);
    });
  }, []);

  const handleCreatePost = (values) => {
    console.log(values.tagIds.flat());
    onCreatePost({
      title: values.title,
      content: values.content,
      isReceipe: values.isReceipe,
      tagIds: values.tagIds.flat(),
      cookTime: values.cookTime,
    });
  };

  const onCreatePost = async (params: CreatePostPayload) => {
    try {
      appLibrary.showloading();
      const { data, status, message: messFromSV } = await postAPI.createPosts(params);
      appLibrary.hideloading();
      if (status === 200) {
        message.success('Tạo bài viết thành công');
        form.resetFields();
        return;
      }
      return message.error(messFromSV);
      return;
    } catch (error) {
      console.log(error);
      appLibrary.hideloading();

      message.error('Có lỗi xảy ra, vui lòng thử lại sau');
    }
  };
  return (
    <>
      <Form onFinish={handleCreatePost} form={form}>
        <div className="flex justify-between">
          <h1 className="text-heading-2">Tạo bài đăng mới</h1>
          <div>
            <button className="mr-5 !border !border-solid !border-[#D2D2D2] px-[15px] py-[4px] rounded-[8px]">
              Hủy
            </button>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </div>
        </div>
        <div className="flex flex-row gap-5">
          <div className="right-side flex flex-col gap-4 w-2/3">
            <span className="font-[500] text-[20px]">Loại bài đăng</span>
            <Form.Item
              name={CreatePostPayloadEnum.isReceipe}
              rules={[{ required: true, message: 'Vui lòng nhập trường này!' }]}
            >
              <Radio.Group className="flex flex-col">
                <Radio value> Cung cấp công thức </Radio>
                <Radio value={false}> Giới thiệu nhà hàng </Radio>
              </Radio.Group>
            </Form.Item>
            <span className="font-[500] text-[20px]">Tiêu đề</span>
            <Form.Item
              name={CreatePostPayloadEnum.title}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập trường này!',
                },
              ]}
            >
              <Input size="large" placeholder="Tiêu đề bài viết" />
            </Form.Item>
            <Form.Item
              name={CreatePostPayloadEnum.content}
              rules={[
                { required: true, message: 'Vui lòng nhập trường này!' },
                {
                  min: 100,
                  message: 'Nội dung bài viết quá ngắn! Tối thiểu 100 từ',
                  validateTrigger: 'onSubmit',
                },
              ]}
            >
              <Editor onChange={(value) => {}} />
            </Form.Item>
          </div>
          <div className="left-side flex flex-col gap-4  w-1/3">
            <span className="font-[500] text-[20px]">Thời gian nấu</span>

            <div className="flex gap-5 items-center">
              <span className="min-w-[120px]">Đơn vị: phút</span>
              <Form.Item
                name={CreatePostPayloadEnum.cookTime}
                className="w-full"
                rules={[
                  { required: true, message: 'Vui lòng nhập trường này!' },
                  // { max: 1000, message: 'Thời gian nấu quá lớn' },
                ]}
              >
                <InputNumber
                  size="large"
                  placeholder="Thời gian nấu ăn"
                  className="w-full"
                  min={2}
                />
              </Form.Item>
            </div>
            <span className="font-[500] text-[20px]">Các tag</span>

            {tags.length > 0 &&
              tags.map((item, index) => (
                <div className=" flex gap-5 items-center mb-5" key={item.id}>
                  <span className="min-w-[120px]"> {item.content}?</span>
                  <Form.Item
                    name={[CreatePostPayloadEnum.tagIds, index]}
                    rules={[{ required: true, message: 'Vui lòng nhập trường này!' }]}
                    className="w-full"
                  >
                    <Select
                      mode="multiple"
                      allowClear
                      size="large"
                      placeholder="Chọn tags"
                      onChange={() => {}}
                      options={item.tags.map((tag) => ({
                        key: tag.id,
                        label: tag.name,
                        value: tag.id,
                      }))}
                    />
                  </Form.Item>
                </div>
              ))}
          </div>
        </div>
      </Form>
    </>
  );
};

export default CreateEditPostModule;