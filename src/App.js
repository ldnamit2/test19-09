import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Select } from "antd";

const provide = [
  {
    id: 1,
    name: 'TP.HCM',
    district1: [
      {
        name: 'Q.Tân Phú'
      },
      {
        name: 'Q.Tân Bình'
      },
      {
        name: 'Q.Bình Tân'
      },
    ]
  },
  {
    id: 2,
    name: 'Đồng Nai',
    district2: [
      {
        name: 'TP.Biên Hòa'
      },
      {
        name: 'H.Long Thành'
      },
      {
        name: 'H.Xuân Lộc'
      },
    ]
  }
]

const trinhdo = [
  {
    name: 'Đại học'
  },
  {
    name: 'Cao đẳng'
  },
  {
    name: 'Trung cấp'
  },
]

const nganh = [
  {
    name: 'Kinh doanh dịch vụ',
    chuc1: [
      {
        name: 'Giám đốc kinh doanh'
      },
      {
        name: 'Nhân viên kinh doanh'
      }
    ]
  },
  {
    name: 'Công nghệ thông tin',
    chuc2: [
      {
        name: 'Frontend Developer'
      },
      {
        name: 'Backend Developer'
      }
    ]
  }
]

const linhvuc = [
  {
    name: 'Thương mại'
  },
  {
    name: 'Dịch vụ'
  },
  {
    name: 'Sản xuất'
  },
]

function App() {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Vui lòng nhập đúng định dạng email.")
      .required("Vui lòng nhập email."),
    phone: yup
      .string()
      .required("Vui lòng nhập số điện thoại.")
      .matches(
        phoneRegExp,
        "Vui lòng nhập đúng định dạng số điện thoại."
      ),
  });

  const form = useForm({
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const handleSubmitForm = (data) => {
    console.log(data);
    console.log("Handle submit....");
  };

  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value);
  }

  const onSearch = (searchTerm) => {
    setValue(searchTerm)
  }

  const [valueDis, setValueDis] = useState('')

  const onChangeDis = (event) => {
    setValueDis(event.target.value);
  }

  const onSearchDis = (searchTerm) => {
    setValueDis(searchTerm)
  }


  const [valuePro, setValuePro] = useState('')

  const onChangePro = (event) => {
    setValuePro(event.target.value);
  }

  const onSearchPro = (searchTerm) => {
    setValuePro(searchTerm)
  }

  const [valueTrinh, setValueTrinh] = useState('')

  const onChangeTrinh = (event) => {
    setValueTrinh(event.target.value);
  }

  const onSearchTrinh = (searchTerm) => {
    setValueTrinh(searchTerm)
  }

  const [valueNganh, setValueNganh] = useState('')

  const onChangeNganh = (event) => {
    setValueNganh(event.target.value);
  }

  const onSearchNganh = (searchTerm) => {
    setValueNganh(searchTerm)
  }

  const [valueChuc, setValueChuc] = useState('')

  const onChangeChuc = (event) => {
    setValueChuc(event.target.value);
  }

  const onSearchChuc = (searchTerm) => {
    setValueChuc(searchTerm)
  }


  const [valueLinh, setValueLinh] = useState('')

  const onChangeLinh = (event) => {
    setValueLinh(event.target.value);
  }

  const onSearchLinh = (searchTerm) => {
    setValueLinh(searchTerm)
  }

  return (
    <Flex justify={"center"} direction={"column"} align={"center"}>
      <Heading>Thông tin cá nhân</Heading>

      <Box w={"600px"}>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <Flex direction={"column"} gap={5}>

            <FormControl isInvalid={[errors.firstname, errors.lastname]}>
              <FormLabel htmlFor="firstname" mb={5}>Họ và tên</FormLabel>
              <Flex direction={"row"} gap={10}>
                <Input {...register("firstname")} placeholder="Họ" />
                {errors.firstname && (
                  <FormErrorMessage>
                    {errors.firstname.message}
                  </FormErrorMessage>
                )}

                <Input {...register("lastname")} placeholder="Tên" />
                {errors.lastname && (
                  <FormErrorMessage>
                    {errors.lastname.message}
                  </FormErrorMessage>
                )}
              </Flex>
            </FormControl>

            <FormControl isInvalid={errors.address}>
              <FormLabel htmlFor="phone">Nơi ở hiện tại</FormLabel>
              <Flex direction={"row"} gap={2}>
                <Flex direction={"column"} gap={2}>
                  <Input {...register("Province")} placeholder="Tỉnh/thành" value={value} onChange={onChange} />
                  <div>
                    {provide.filter(item => {
                      const searchTerm = value.toLowerCase();
                      const full = item.name.toLowerCase();
                      return searchTerm && full.startsWith(searchTerm) && full !== searchTerm
                    })
                      .map((item) => (
                        <div onClick={() => onSearch(item.name)}>{item.name}</div>
                      ))}
                  </div>
                </Flex>
                <Flex direction={"column"} gap={2}>
                  <Input {...register("district")} placeholder="Quận/huyện" value={valueDis} onChange={onChangeDis} />
                  {value === 'TP.HCM' ?
                    provide
                      .map((item) => {
                        var dis1 = item.district1;
                        return (
                          dis1?.filter(item => {
                            const searchTerm = valueDis.toLowerCase();
                            const full = item.name.toLowerCase();
                            return searchTerm && full.startsWith(searchTerm) && full !== searchTerm
                          }).map((item) => (
                            <div onClick={() => onSearchDis(item.name)}>{item.name}</div>
                          ))
                        )
                      })
                    : value === 'Đồng Nai' ? provide
                      .map((item) => {
                        var dis2 = item.district2;
                        return (
                          dis2?.filter(item => {
                            const searchTerm = valueDis.toLowerCase();
                            const full = item.name.toLowerCase();
                            return searchTerm && full.startsWith(searchTerm) && full !== searchTerm
                          }).map((item) => (
                            <div onClick={() => onSearchDis(item.name)}>{item.name}</div>
                          ))
                        )
                      }) : null}
                </Flex>
              </Flex>

            </FormControl>

            <FormControl isInvalid={errors.que}>
              <FormLabel htmlFor="que" mb={5}>Quê quán</FormLabel>
              <Flex direction={"column"} gap={2}>
                <Input {...register("Provinces")} placeholder="Tỉnh/thành" value={valuePro} onChange={onChangePro} />
                <div>
                  {provide.filter(item => {
                    const searchTerm = valuePro.toLowerCase();
                    const full = item.name.toLowerCase();
                    return searchTerm && full.startsWith(searchTerm) && full !== searchTerm
                  })
                    .map((item) => (
                      <div onClick={() => onSearchPro(item.name)}>{item.name}</div>
                    ))}
                </div>
                {errors.que && (
                  <FormErrorMessage>
                    {errors.que.message}
                  </FormErrorMessage>
                )}
              </Flex>
            </FormControl>

            <FormControl isInvalid={errors.year}>
              <FormLabel htmlFor="year" mb={5}>Năm sinh</FormLabel>
              <Flex direction={"column"} gap={2}>
                <Input {...register("Provinces")} placeholder="Năm sinh" type="number" min="1900" max="2099" step="1" />
                <div>
                  {provide.filter(item => {
                    const searchTerm = valuePro.toLowerCase();
                    const full = item.name.toLowerCase();
                    return searchTerm && full.startsWith(searchTerm) && full !== searchTerm
                  })
                    .map((item) => (
                      <div onClick={() => onSearchPro(item.name)}>{item.name}</div>
                    ))}
                </div>
                {errors.que && (
                  <FormErrorMessage>
                    {errors.que.message}
                  </FormErrorMessage>
                )}
              </Flex>
            </FormControl>

            <FormControl isInvalid={errors.trinhdo}>
              <FormLabel htmlFor="trinhdo" mb={5}>Trình độ</FormLabel>
              <Flex direction={"column"} gap={2}>
                <Input {...register("trinhdo")} placeholder="trình độ" value={valueTrinh} onChange={onChangeTrinh} />
                <div>
                  {trinhdo.filter(item => {
                    const searchTerm = valueTrinh.toLowerCase();
                    const full = item.name.toLowerCase();
                    return searchTerm && full.startsWith(searchTerm) && full !== searchTerm
                  })
                    .map((item) => (
                      <div onClick={() => onSearchTrinh(item.name)}>{item.name}</div>
                    ))}
                </div>
                {errors.trinhdo && (
                  <FormErrorMessage>
                    {errors.trinhdo.message}
                  </FormErrorMessage>
                )}
              </Flex>
            </FormControl>

            <FormControl isInvalid={errors.Nganh}>
              <FormLabel htmlFor="Nganh" mb={5}>Chuyên Ngành</FormLabel>
              <Flex direction={"column"} gap={2}>
                <Input {...register("Nganh")} placeholder="Chuyên Ngành" value={valueNganh} onChange={onChangeNganh} />
                <div>
                  {nganh.filter(item => {
                    const searchTerm = valueNganh.toLowerCase();
                    const full = item.name.toLowerCase();
                    return searchTerm && full.startsWith(searchTerm) && full !== searchTerm
                  })
                    .map((item) => (
                      <div onClick={() => onSearchNganh(item.name)}>{item.name}</div>
                    ))}
                </div>
                {errors.Nganh && (
                  <FormErrorMessage>
                    {errors.Nganh.message}
                  </FormErrorMessage>
                )}
              </Flex>
            </FormControl>

            <FormControl isInvalid={errors.chuc}>
              <FormLabel htmlFor="chuc" mb={5}>Chức danh công việc</FormLabel>
              <Flex direction={"column"} gap={2}>
                <Input {...register("chuc")} placeholder="Chức vụ" value={valueChuc} onChange={onChangeChuc} />
                {value === 'Kinh doanh dịch vụ' ?
                  nganh
                    .map((item) => {
                      var dis1 = item.chuc1;
                      return (
                        dis1?.filter(item => {
                          const searchTerm = valueChuc.toLowerCase();
                          const full = item.name.toLowerCase();
                          return searchTerm && full.startsWith(searchTerm) && full !== searchTerm
                        }).map((item) => (
                          <div onClick={() => onSearchChuc(item.name)}>{item.name}</div>
                        ))
                      )
                    })
                  : value === 'Công nghệ thông tin' ?
                    nganh.map((item) => {
                      var dis2 = item.chuc2;
                      return (
                        dis2?.filter(item => {
                          const searchTerm = valueChuc.toLowerCase();
                          const full = item.name.toLowerCase();
                          return searchTerm && full.startsWith(searchTerm) && full !== searchTerm
                        }).map((item) => (
                          <div onClick={() => onSearchChuc(item.name)}>{item.name}</div>
                        ))
                      )
                    }) : null}
              </Flex>
            </FormControl>

            <FormControl isInvalid={errors.linhvuc}>
              <FormLabel htmlFor="linhvuc" mb={5}>Lĩnh vực làm việc</FormLabel>
              <Select mode="multiple" style={{ width: 120 }}>
              {linhvuc.map((item) => 
              <Select.Option value={item.name}>{item.name}</Select.Option>
              )}
                
              </Select>
            </FormControl>

            <Box>
              <Button type="submit">Submit</Button>
            </Box>
          </Flex>
        </form>
      </Box>
    </Flex >
  );
}

export default App;
