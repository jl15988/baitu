# Builder构建器模块

Builder构建器模块提供了一种简便的方式来创建和配置对象，支持链式调用和类型安全的属性设置。

## 主要功能

- 支持从类的构造函数创建Builder
- 支持从现有对象创建Builder
- 支持链式调用设置属性（两种方式）：
  - 通过 `.set('属性名', 值)` 方法设置
  - 直接通过 `.属性名(值)` 方法设置
- 完全支持可选属性（带?标记的属性）的链式调用
- 支持批量设置多个属性
- 支持使用转换函数进行复杂的对象处理
- 完全类型安全，支持TypeScript的类型推断
- 新功能：精确的类型跟踪，build方法返回的类型仅包含已设置的属性

## 使用方法

### 创建Builder

支持对象、类和构造函数创建Builder。

```typescript
import { Builder } from '../modules/builder';

class User {
    id?: number;
    name?: string;
    age?: number;
}

// 创建一个用户对象
const user = Builder.of(User)
    // 使用set方法
    .set('id', 1)
    // 也可以直接用属性名作为方法
    .name('张三')
    .set('age', 30)
    .build();
```

### 类型跟踪功能

```typescript
import { Builder } from '../modules/builder';

interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;
}

// 只设置了name和price属性，返回的类型是Pick<Product, "name" | "price">
const partialProduct = Builder.of<Product>({} as Product)
    .name("智能手机")
    .price(3999)
    .build();

// 类型安全：编译器会提示缺少必需属性id
// const product: Product = partialProduct; // 错误：缺少id属性

// 正确设置所有必需属性
const completeProduct = Builder.of<Product>({} as Product)
    .id(101)
    .name("智能手机")
    .price(3999)
    .build();

// 类型安全：可以赋值给Product类型
const product: Product = completeProduct; // 正确
```

### 批量设置属性

```typescript
import { Builder } from '../modules/builder';

class User {
    id?: number;
    name?: string;
    age?: number;
    roles?: string[];
}

const user = Builder.of(new User())
    .setValues({
        id: 2,
        name: '李四',
        age: 25,
        roles: ['admin', 'editor']
    })
    .build();
```

### 使用转换函数

```typescript
import { Builder } from '../modules/builder';

const product = Builder.of({
    id: 0, 
    name: '', 
    price: 0, 
    tags: []
})
    .id(102)
    .name('笔记本电脑')
    .transform(instance => {
        // 可以在转换函数中进行复杂的逻辑处理
        instance.tags = ['电子产品', '电脑'];
        instance.price = 6999 * 0.9; // 打9折
    })
    .build();
```

### 创建空对象Builder

```typescript
import { Builder } from '../modules/builder';

const settings = Builder.empty<{theme: string, fontSize: number}>()
    .theme('dark')
    .fontSize(16)
    .build();
```

## API参考

### Builder类

- `constructor(prototype, initialValues?)`: 构造函数
- `set(key, value)`: 设置单个属性
- `setValues(values)`: 批量设置多个属性
- `get(key)`: 获取属性值
- `transform(transformer)`: 应用转换函数
- `build()`: 构建并返回最终对象，**类型为Pick<T, TSet>**，只包含已设置的属性
- `static of(prototype, initialValues?)`: 静态创建方法
- `static empty(initialValues?)`: 创建空对象Builder
