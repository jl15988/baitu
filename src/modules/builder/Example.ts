import { Builder } from "./index";

// 示例1: 使用类构造函数创建Builder
class User {
	id?: number;
	name?: string;
	age?: number;
	email?: string;
	address?: string;
	roles?: string[];

	constructor() {
		this.roles = [];
	}
}

// 示例2: 使用普通对象创建Builder
interface Product {
	id: number;
	name: string;
	price: number;
	description?: string;
	tags: string[];
}

/**
 * Builder模式使用示例
 */
export function builderExamples() {
	// 示例1: 使用类构造函数创建Builder (set方式)
	const user = Builder.of(User)
		.set("id", 1)
		.set("name", "张三")
		.set("age", 30)
		.set("email", "zhangsan@example.com")
		.build();
	console.log("创建的用户对象:", user);

	// 测试getOrDefault方法
	var orDefault = Builder.of(User).getOrDefault("age", 0);

	// 示例2: 使用对象创建Builder (set方式)
	const productTemplate = {
		id: 0,
		name: "",
		price: 0,
		tags: [],
	};

	const product = Builder.of<Product>(productTemplate)
		.set("id", 101)
		.set("name", "智能手机")
		.set("price", 3999)
		.set("description", "最新款智能手机，功能强大")
		.set("tags", [
			"电子产品", "手机", "新品",
		])
		.build();
	console.log("创建的产品对象:", product);

	// 示例3: 一次设置多个属性
	const user2 = Builder.of(new User())
		.setValues({
			id: 2,
			name: "李四",
			age: 25,
			email: "lisi@example.com",
			roles: [
				"admin", "editor",
			],
		})
		.build();
	console.log("批量设置属性创建的用户:", user2);

	// 示例4: 使用转换函数
	const product2 = Builder.of<Product>(productTemplate)
		.set("id", 102)
		.set("name", "笔记本电脑")
		.set("price", 6999)
		.transform(instance => {
			instance.tags = [
				"电子产品", "电脑", "办公",
			];
			instance.description = `高性能笔记本电脑，售价: ${instance.price}元`;
		})
		.build();
	console.log("使用转换函数创建的产品:", product2);

	// 示例5: 创建空对象并逐步构建
	const settings = Builder.empty<{ theme: string; fontSize: number; notifications: boolean }>()
		.set("theme", "dark")
		.set("fontSize", 16)
		.set("notifications", true)
		.build();
	console.log("从空对象创建的设置:", settings);

	// 示例6: 使用属性方法设置属性（新增功能）
	const user3 = Builder.of(User)
		.id(3)
		.name("王五")
		.age(28)
		.email("wangwu@example.com")
		.roles([
			"user",
		])
		.build();
	console.log("使用属性方法创建的用户:", user3);

	// 示例7: 混合使用属性方法和set方法
	const product3 = Builder.of<Product>(productTemplate)
		.id(103)
		.name("平板电脑")
		.price(2999)
		.set("description", "轻薄便携的平板电脑")
		.tags([
			"电子产品", "平板", "便携",
		])
		.build();
	console.log("混合使用属性方法和set方法创建的产品:", product3);

	// 示例8: 使用属性方法创建空对象
	const config = Builder.empty<{ debug: boolean; maxConnections: number }>()
		.debug(true)
		.maxConnections(10)
		.build();
	console.log("使用属性方法创建的配置:", config);

	// 示例9: 测试可选属性链式调用
	const partialUser = Builder.of(User)
		.id(4)
		.name("赵六")
		// 注意：这里不设置age和其他可选属性
		.build();
	console.log("部分设置属性的用户:", partialUser);
}
