import { varType } from "../examples/utils/jsCool";
import { validEmail,validPhone,validURL } from "../examples/utils/validate";
const { getChangedFilesForRoots } = require('jest-changed-files');
// 比较两个map的数据
const { diff } = require('jest-diff');
const a = {a: {b: {c: 5}}};
const b = {a: {b: {c: 6}}};

const result = diff(a, b);

// 选择文件使用
getChangedFilesForRoots(['./'], {
  lastCommit: true,
}).then(result => console.log(result.changedFiles));

beforeEach(()=>{
  // TODO:每个test实例运行前的操作
});

afterEach(()=>{
  // TODO:每个test实例运行后执行的操作
})

test("test var type",()=>{
  expect(varType("str")).toBe("string");
  // valide部分；toBe检测非引用值
  expect(validEmail('132@cc.com')).toBe(true);
  expect(validPhone('18313746328')).toBe(true);
  // .not表非
  expect(validPhone('342324324')).not.toBe(true);
  expect(validURL('http://abnck.com')).toBe(true);
  // toequal: 判断引用类型数据
  expect({a:1,b:'2'}).toEqual({a:1,b:'2'});
  expect(null).toBeNull();
  //expect(aa).toBeUndefined();
  expect('34').toBeTruthy();
  expect(undefined).toBeFalsy();
  //包含检测
  expect(['a','link','pre','spect','ive']).toContain('spect');
  // 检测抛错
  expect(()=>{throw new Error('fff')}).toThrow(Error);
  // 有promise运行的
  expect((function(){
    return Promise.resolve(true);
  })()).resolves.toBe(true);
})
 