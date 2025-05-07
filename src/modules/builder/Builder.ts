/**
 * 动态Builder类型，提供属性链式调用方法
 * 使所有属性方法都是必需的，即使原属性是可选的
 */
export type DynamicBuilder<T, TSet extends keyof T = never> = {
	[K in keyof T]-?: (value: T[K]) => DynamicBuilder<T, TSet | K>;
} & {
	set<K extends keyof T>(key: K, value: T[K]): DynamicBuilder<T, TSet | K>;
	setValues<K extends keyof T>(values: Pick<T, K>): DynamicBuilder<T, TSet | K>;
	get<K extends keyof T>(key: K): T[K];
	transform(transformer: (instance: Partial<T>) => void): DynamicBuilder<T, TSet>;
	build(): Pick<T, TSet>;
};

/**
 * 通用Builder构建器
 * 支持从实体类或对象构建Builder对象，并通过链式调用设置属性
 */
export class Builder<T extends Record<string, any>, TSet extends keyof T = never> {
	private readonly instance: T;
	private readonly setProperties: Set<keyof T>;

	/**
	 * 构造函数
	 * @param prototype 原型对象或类的实例或构造函数
	 * @param initialValues 初始值
	 */
	constructor(prototype: T | (new () => T), initialValues?: Partial<T>) {
		if (typeof prototype === "function") {
			// 如果是构造函数，创建新实例
			this.instance = new (prototype as new () => T)();
		} else {
			// 如果是对象，创建深拷贝
			this.instance = structuredClone(prototype as T);
		}

		this.setProperties = new Set<keyof T>();

		// 应用初始值
		if (initialValues) {
			Object.keys(initialValues).forEach(key => {
				this.setProperties.add(key as keyof T);
			});
			Object.assign(this.instance, initialValues);
		}
	}

	/**
	 * 设置属性值
	 * @param key 属性名
	 * @param value 属性值
	 */
	set<K extends keyof T>(key: K, value: T[K]): Builder<T, TSet | K> {
		this.instance[key] = value;
		this.setProperties.add(key);
		return this as unknown as Builder<T, TSet | K>;
	}

	/**
	 * 批量设置多个属性值
	 * @param values 属性值对象
	 */
	setValues<K extends keyof T>(values: Pick<T, K>): Builder<T, TSet | K> {
		Object.keys(values).forEach(key => {
			this.setProperties.add(key as keyof T);
		});
		Object.assign(this.instance, values);
		return this as unknown as Builder<T, TSet | K>;
	}

	/**
	 * 获取属性值
	 * @param key 属性名
	 */
	get<K extends keyof T>(key: K): T[K] {
		return this.instance[key];
	}

	/**
	 * 应用转换函数到当前实例
	 * @param transformer 转换函数
	 */
	transform(transformer: (instance: Partial<T>) => void): Builder<T, TSet> {
		transformer(this.instance);
		return this;
	}

	/**
	 * 获取构建的对象实例
	 * 返回类型仅包含已设置的属性
	 */
	build(): Pick<T, TSet> {
		const result: Partial<T> = {};
		this.setProperties.forEach(prop => {
			result[prop] = structuredClone(this.instance[prop]);
		});
		return result as Pick<T, TSet>;
	}

	/**
	 * 创建Builder实例的静态方法
	 * @param prototype 原型对象或类的实例或构造函数
	 * @param initialValues 初始值
	 */
	static of<T extends Record<string, any>, K extends keyof T = never>(
		prototype: T | (new () => T),
		initialValues?: Pick<T, K>
	): DynamicBuilder<T, K> {
		const builder = new Builder<T, K>(prototype, initialValues as Partial<T>);

		// 创建代理对象，用于拦截所有未知属性的访问
		const proxy = new Proxy(builder, {
			// 获取属性时的处理
			get(target, prop, receiver) {
				// 如果属性存在于目标对象中，直接返回
				if (prop in target) {
					return Reflect.get(target, prop, receiver);
				}

				// 否则，创建并返回一个设置该属性的函数
				return (value: any) => {
					(target as any).set(prop, value);
					// 返回代理对象以支持链式调用
					return proxy;
				};
			},
		});

		return proxy as unknown as DynamicBuilder<T, K>;
	}

	/**
	 * 创建空对象Builder的静态方法
	 * @param initialValues 初始值
	 */
	static empty<T extends Record<string, any>, K extends keyof T = never>(
		initialValues?: Pick<T, K>
	): DynamicBuilder<T, K> {
		return Builder.of({} as T, initialValues);
	}
}

export default Builder;
