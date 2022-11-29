import { IPost } from '@/interfaces/models/IPost';
import { getQuestionRespose, questionAPI } from '@/modules/SugesstionRecipe/api';
import { appLibrary } from '@/shared/utils/loading';
import { Loading } from '@nextui-org/react';
import { Button, Form, Input, InputNumber, message, Radio, Select, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { isObject } from 'lodash-es';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useId, useState } from 'react';
import { CreatePostPayload, postAPI, uploadFile } from '../../api';
export enum CreatePostPayloadEnum {
  title = 'title',
  content = 'content',
  isReceipe = 'isReceipe',
  tagIds = 'tagIds',
  cookTime = 'cookTime',
  thumbnail = 'thumbnail',
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
  post?: IPost;
  tags?: getQuestionRespose[];
};

const CreateEditPostModule = (props: Props) => {
  const isEditMode = props.post ? true : false;
  const router = useRouter();
  const getTags = async () => {
    const { data } = await questionAPI.getQuestions(5);
    return data;
  };
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    const newFile = newFileList.pop();
    if (newFile) {
      setFileList([newFile]);
      form.setFieldValue(CreatePostPayloadEnum.thumbnail, newFile);
    } else {
      setFileList([]);
    }
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const [tagCard, setTagCard] = useState<getQuestionRespose[]>([]);
  const { post, tags } = props;
  const [form] = Form.useForm();
  const [isReceipe, setIsRecipe] = useState(false);
  const uuid = useId();
  useEffect(() => {
    if (post) {
      setIsRecipe(post.isReceipe);
      form.setFieldsValue(post);
      console.log(post);
      setFileList([
        {
          uid: uuid,
          url: post.thumbnail,
          name: CreatePostPayloadEnum.thumbnail,
        },
      ]);
      form.setFieldValue(CreatePostPayloadEnum.thumbnail, post.thumbnail);
    }
  }, [post]);
  useEffect(() => {
    getTags().then((res) => {
      setTagCard(res);
      res.forEach((element, index) => {
        const currentItem = tags ? tags.find((item) => item.id === element.id) : null;
        if (currentItem) {
          form.setFields([
            {
              name: [CreatePostPayloadEnum.tagIds, index],
              value: currentItem.tags.map((item) => ({
                id: item.id,
                name: item.name,
                value: item.id,
              })),
            },
          ]);
        }
      });
    });
  }, []);

  const handleCreatePost = (values) => {
    onCreatePost({
      title: values.title,
      content: values.content,
      isReceipe: values.isReceipe,
      tagIds: values.tagIds.flat(),
      cookTime: values.cookTime,
      thumbnail: '',
    });
  };

  const onCreatePost = async (params: CreatePostPayload) => {
    try {
      appLibrary.showloading();
      const thumbnails = form.getFieldValue(CreatePostPayloadEnum.thumbnail)
        ?.originFileObj as File;
      const { key } = await uploadFile(thumbnails);

      if (key) {
        params.thumbnail = key;
      }
      const { data, status, message: messFromSV } = await postAPI.createPosts(params);
      appLibrary.hideloading();
      if (status === 200) {
        message.success('Tạo bài viết thành công');
        form.resetFields();
        router.push(`/bai-dang/${data.id}`);
        return;
      }
      return message.error(messFromSV);
    } catch (error) {
      console.log(error);
      appLibrary.hideloading();
      message.error('Có lỗi xảy ra, vui lòng thử lại sau');
    }
  };

  const handleUpdatePost = (values) => {
    onUpdatePost(post.id, {
      title: values.title,
      content: values.content,
      isReceipe: values.isReceipe,
      tagIds: values.tagIds.flat().map((item) => (isObject(item) ? item.id : item)), // shit code but busy now
      cookTime: values.cookTime,
      thumbnail: post.thumbnail,
    });
  };

  const onUpdatePost = async (id: number, params: CreatePostPayload) => {
    try {
      appLibrary.showloading();

      if (
        fileList.length > 0 &&
        fileList.pop()?.uid !== CreatePostPayloadEnum.thumbnail
      ) {
        const thumbnails = form.getFieldValue(CreatePostPayloadEnum.thumbnail)
          ?.originFileObj as File;
        const { key } = await uploadFile(thumbnails);
        if (key) {
          params.thumbnail = key;
        }
      }
      const { data, status, message: messFromSV } = await postAPI.updatePosts(id, params);
      appLibrary.hideloading();
      if (status === 200) {
        message.success('Chỉnh sửa bài viết thành công');
        router.push(`/bai-dang/${id}`);
        return;
      }
      return message.error(messFromSV);
    } catch (error) {
      appLibrary.hideloading();
      console.log(error);
      message.error('Có lỗi xảy ra, vui lòng thử lại sau');
    }
  };

  return (
    <>
      <Form onFinish={isEditMode ? handleUpdatePost : handleCreatePost} form={form}>
        <div className="flex justify-between">
          <h1 className="text-heading-2">Tạo bài đăng mới</h1>
          <div>
            <button className="btn-secondary mr-5">Hủy</button>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </div>
        </div>
        <div className="flex flex-row gap-5">
          <div className="left-side flex flex-col gap-4 w-2/3">
            <span className="font-[500] text-[20px]">Loại bài đăng</span>
            <Form.Item
              name={CreatePostPayloadEnum.isReceipe}
              rules={[{ required: true, message: 'Vui lòng nhập trường này!' }]}
            >
              <Radio.Group
                className="flex flex-col"
                onChange={(e) => setIsRecipe(Boolean(e.target.value))}
              >
                <Radio value>Cung cấp công thức</Radio>
                <Radio value={false}>Giới thiệu nhà hàng </Radio>
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
              <Editor defaultValue={post?.content ?? ''} onChange={(value) => {}} />
            </Form.Item>
          </div>
          <div className="right-side flex flex-col gap-4  w-1/3">
            <span className="font-[500] text-[20px]">Chọn thumbnails</span>
            <Form.Item
              rules={[{ required: true, message: 'Chọn thumbnail!' }]}
              name={CreatePostPayloadEnum.thumbnail}
            >
              <Upload
                listType="picture-card"
                fileList={fileList ?? []}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 5 && '+ Upload '}
              </Upload>
              {/* </ImgCrop> */}
            </Form.Item>
            {isReceipe && (
              <div>
                <span className="font-[500] text-[20px]">Thời gian nấu</span>

                <div className="flex gap-5 items-center">
                  <span className="min-w-[120px]">Đơn vị: phút</span>
                  <Form.Item
                    name={CreatePostPayloadEnum.cookTime}
                    className="w-full"
                    rules={[{ required: true, message: 'Vui lòng nhập trường này!' }]}
                  >
                    <InputNumber
                      size="large"
                      placeholder="Thời gian nấu ăn"
                      className="w-full"
                      min={2}
                      max={1000000}
                    />
                  </Form.Item>
                </div>
              </div>
            )}

            <span className="font-[500] text-[20px]">Các tag</span>
            {tagCard.length > 0 &&
              tagCard.map((item, index) => (
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
