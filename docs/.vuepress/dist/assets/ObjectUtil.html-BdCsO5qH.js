import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,d as t}from"./app-BN9xbzKT.js";const e={},p=t(`<h2 id="_1-判空-isempty" tabindex="-1"><a class="header-anchor" href="#_1-判空-isempty"><span>1. 判空 - isEmpty</span></a></h2><p>判断任意一种类型数据是否为空：字符串、null、undefined、数组、对象等</p><h3 id="参数" tabindex="-1"><a class="header-anchor" href="#参数"><span>参数</span></a></h3><table><thead><tr><th>序号</th><th>名称</th><th>类型</th><th>含义</th></tr></thead><tbody><tr><td>1</td><td>value</td><td>任意类型</td><td>要判空的值</td></tr></tbody></table><h3 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h3><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>ObjectUtil<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
ObjectUtil<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
ObjectUtil<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
ObjectUtil<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
ObjectUtil<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
ObjectUtil<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// false</span>
ObjectUtil<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// false</span>
ObjectUtil<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-深拷贝-deepcopy" tabindex="-1"><a class="header-anchor" href="#_2-深拷贝-deepcopy"><span>2. 深拷贝 - deepCopy</span></a></h2><p>对于对象来说，其中的内容可能是多层嵌套的，深拷贝用于解决多层嵌套对象的复制问题，无论其中是<strong>对象、函数还是数组</strong>，都能完整的复制出另一份。</p><h3 id="示例-1" tabindex="-1"><a class="header-anchor" href="#示例-1"><span>示例</span></a></h3><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">let</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">p1</span><span class="token operator">:</span> <span class="token string">&#39;1&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">p2</span><span class="token operator">:</span> <span class="token string">&#39;2&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">p3</span><span class="token operator">:</span> <span class="token string">&#39;3&#39;</span><span class="token punctuation">,</span>
    <span class="token function-variable function">p4</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&#39;5&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> obj2 <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">a1</span><span class="token operator">:</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">a2</span><span class="token operator">:</span> <span class="token string">&#39;b&#39;</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> obj3 <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">d1</span><span class="token operator">:</span> obj1<span class="token punctuation">,</span>
    <span class="token literal-property property">ar</span><span class="token operator">:</span> <span class="token punctuation">[</span>obj1<span class="token punctuation">,</span> obj2<span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> obj4 <span class="token operator">=</span> ObjectUtil<span class="token punctuation">.</span><span class="token function">deepCopy</span><span class="token punctuation">(</span>obj3<span class="token punctuation">)</span>
<span class="token keyword">let</span> obj5 <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">f1</span><span class="token operator">:</span> ObjectUtil<span class="token punctuation">.</span><span class="token function">deepCopy</span><span class="token punctuation">(</span>obj2<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

obj1<span class="token punctuation">.</span>p1 <span class="token operator">=</span> <span class="token string">&#39;4&#39;</span>
obj1<span class="token punctuation">.</span><span class="token function-variable function">p4</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&#39;6&#39;</span>
<span class="token punctuation">}</span>
obj2<span class="token punctuation">.</span>a1 <span class="token operator">=</span> <span class="token string">&#39;c&#39;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj1<span class="token punctuation">)</span>
<span class="token comment">/*
{
    &quot;p1&quot;: &quot;4&quot;,
    &quot;p2&quot;: &quot;2&quot;,
    &quot;p3&quot;: &quot;3&quot;,
    &quot;p4&quot;: () =&gt; {
    	return &quot;6&quot;
    }
}
*/</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj2<span class="token punctuation">)</span>
<span class="token comment">/*
{
    &quot;a1&quot;: &quot;c&quot;,
    &quot;a2&quot;: &quot;b&quot;
}
*/</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj3<span class="token punctuation">)</span>
<span class="token comment">/*
非深拷贝，值发生变化
{
    &quot;d1&quot;: {
        &quot;p1&quot;: &quot;4&quot;, // 变了
        &quot;p2&quot;: &quot;2&quot;,
        &quot;p3&quot;: &quot;3&quot;,
        &quot;p4&quot;: () =&gt; {
            return &quot;6&quot; // 变了
        }
    },
    &quot;ar&quot;: [
        {
            &quot;p1&quot;: &quot;4&quot;, // 变了
            &quot;p2&quot;: &quot;2&quot;,
            &quot;p3&quot;: &quot;3&quot;,
            &quot;p4&quot;: () =&gt; {
                return &quot;6&quot; // 变了
            }
        },
        {
            &quot;a1&quot;: &quot;c&quot;, // 变了
            &quot;a2&quot;: &quot;b&quot;
        }
    ]
}
*/</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj4<span class="token punctuation">)</span>
<span class="token comment">/*
因为obj4是深拷贝出来的，所以不变
{
    &quot;d1&quot;: {
        &quot;p1&quot;: &quot;1&quot;, // 没变
        &quot;p2&quot;: &quot;2&quot;,
        &quot;p3&quot;: &quot;3&quot;,
        &quot;p4&quot;: () =&gt; {
            return &quot;5&quot; // 没变
        }
    },
    &quot;ar&quot;: [
        {
            &quot;p1&quot;: &quot;1&quot;, // 没变
            &quot;p2&quot;: &quot;2&quot;,
            &quot;p3&quot;: &quot;3&quot;,
            &quot;p4&quot;: () =&gt; {
                return &quot;5&quot; // 没变
            }
        },
        {
            &quot;a1&quot;: &quot;a&quot;, // 没变
            &quot;a2&quot;: &quot;b&quot;
        }
    ]
}
*/</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj5<span class="token punctuation">)</span>
<span class="token comment">/*
{
    &quot;f1&quot;: {
        &quot;a1&quot;: &quot;a&quot;, // 没变
        &quot;a2&quot;: &quot;b&quot;
    }
}
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-判空追加-appendifnotempty" tabindex="-1"><a class="header-anchor" href="#_3-判空追加-appendifnotempty"><span>3. 判空追加 - appendIfNotEmpty</span></a></h2><p>在一些场景中，需要对一个对象进行追加响应的值，前提是这个对象不是空的，该方法就是为了简化了这个过程。</p><h3 id="参数-1" tabindex="-1"><a class="header-anchor" href="#参数-1"><span>参数</span></a></h3><table><thead><tr><th>序号</th><th>名称</th><th>类型</th><th>含义</th></tr></thead><tbody><tr><td>1</td><td>obj</td><td>任何对象</td><td>要判空的对象，最终结果将执行 toString 方法</td></tr><tr><td>2</td><td>appends</td><td>任意</td><td>要追加的值，追加时将执行 toString 方法</td></tr></tbody></table><h3 id="示例-2" tabindex="-1"><a class="header-anchor" href="#示例-2"><span>示例</span></a></h3><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ObjectUtil<span class="token punctuation">.</span><span class="token function">appendIfNotEmpty</span><span class="token punctuation">(</span><span class="token string">&quot;苹果&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;香蕉&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 苹果香蕉</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ObjectUtil<span class="token punctuation">.</span><span class="token function">appendIfNotEmpty</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;香蕉&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// &#39;&#39;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ObjectUtil<span class="token punctuation">.</span><span class="token function">appendIfNotEmpty</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">&quot;香蕉&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 0香蕉</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ObjectUtil<span class="token punctuation">.</span><span class="token function">appendIfNotEmpty</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">&quot;香蕉&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// &#39;&#39;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ObjectUtil<span class="token punctuation">.</span><span class="token function">appendIfNotEmpty</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">&quot;香蕉&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// &#39;&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16),o=[p];function i(c,l){return s(),a("div",null,o)}const r=n(e,[["render",i],["__file","ObjectUtil.html.vue"]]),k=JSON.parse('{"path":"/modules/object/ObjectUtil.html","title":"ObjectUtil - 对象工具","lang":"zh-CN","frontmatter":{"title":"ObjectUtil - 对象工具","category":["对象"],"tag":["对象工具"],"description":"1. 判空 - isEmpty 判断任意一种类型数据是否为空：字符串、null、undefined、数组、对象等 参数 示例 2. 深拷贝 - deepCopy 对于对象来说，其中的内容可能是多层嵌套的，深拷贝用于解决多层嵌套对象的复制问题，无论其中是对象、函数还是数组，都能完整的复制出另一份。 示例 3. 判空追加 - appendIfNotEmpt...","head":[["meta",{"property":"og:url","content":"https://jl15988.gitee.io/baitu/baitu/modules/object/ObjectUtil.html"}],["meta",{"property":"og:site_name","content":"Baitu 文档"}],["meta",{"property":"og:title","content":"ObjectUtil - 对象工具"}],["meta",{"property":"og:description","content":"1. 判空 - isEmpty 判断任意一种类型数据是否为空：字符串、null、undefined、数组、对象等 参数 示例 2. 深拷贝 - deepCopy 对于对象来说，其中的内容可能是多层嵌套的，深拷贝用于解决多层嵌套对象的复制问题，无论其中是对象、函数还是数组，都能完整的复制出另一份。 示例 3. 判空追加 - appendIfNotEmpt..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-20T16:27:34.000Z"}],["meta",{"property":"article:author","content":"会功夫的李白"}],["meta",{"property":"article:tag","content":"对象工具"}],["meta",{"property":"article:modified_time","content":"2024-04-20T16:27:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ObjectUtil - 对象工具\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-20T16:27:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"会功夫的李白\\",\\"url\\":\\"https://gitee.com/jl15988\\"}]}"]]},"headers":[{"level":2,"title":"1. 判空 - isEmpty","slug":"_1-判空-isempty","link":"#_1-判空-isempty","children":[{"level":3,"title":"参数","slug":"参数","link":"#参数","children":[]},{"level":3,"title":"示例","slug":"示例","link":"#示例","children":[]}]},{"level":2,"title":"2. 深拷贝 - deepCopy","slug":"_2-深拷贝-deepcopy","link":"#_2-深拷贝-deepcopy","children":[{"level":3,"title":"示例","slug":"示例-1","link":"#示例-1","children":[]}]},{"level":2,"title":"3. 判空追加 - appendIfNotEmpty","slug":"_3-判空追加-appendifnotempty","link":"#_3-判空追加-appendifnotempty","children":[{"level":3,"title":"参数","slug":"参数-1","link":"#参数-1","children":[]},{"level":3,"title":"示例","slug":"示例-2","link":"#示例-2","children":[]}]}],"git":{"createdTime":1710405538000,"updatedTime":1713630454000,"contributors":[{"name":"jl15988","email":"jl15988@qq.com","commits":3}]},"readingTime":{"minutes":1.63,"words":488},"filePathRelative":"modules/object/ObjectUtil.md","localizedDate":"2024年3月14日","autoDesc":true,"excerpt":"<h2>1. 判空 - isEmpty</h2>\\n<p>判断任意一种类型数据是否为空：字符串、null、undefined、数组、对象等</p>\\n<h3>参数</h3>\\n<table>\\n<thead>\\n<tr>\\n<th>序号</th>\\n<th>名称</th>\\n<th>类型</th>\\n<th>含义</th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td>1</td>\\n<td>value</td>\\n<td>任意类型</td>\\n<td>要判空的值</td>\\n</tr>\\n</tbody>\\n</table>\\n<h3>示例</h3>\\n<div class=\\"language-javascript\\" data-ext=\\"js\\" data-title=\\"js\\"><pre class=\\"language-javascript\\"><code>ObjectUtil<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">isEmpty</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">)</span> <span class=\\"token comment\\">// true</span>\\nObjectUtil<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">isEmpty</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">undefined</span><span class=\\"token punctuation\\">)</span> <span class=\\"token comment\\">// true</span>\\nObjectUtil<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">isEmpty</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">)</span> <span class=\\"token comment\\">// true</span>\\nObjectUtil<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">isEmpty</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span> <span class=\\"token comment\\">// true</span>\\nObjectUtil<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">isEmpty</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"\\"</span><span class=\\"token punctuation\\">)</span> <span class=\\"token comment\\">// true</span>\\nObjectUtil<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">isEmpty</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">[</span><span class=\\"token string\\">\\"1\\"</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">)</span> <span class=\\"token comment\\">// false</span>\\nObjectUtil<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">isEmpty</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">{</span><span class=\\"token literal-property property\\">key</span><span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"hello\\"</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span> <span class=\\"token comment\\">// false</span>\\nObjectUtil<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">isEmpty</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"hello\\"</span><span class=\\"token punctuation\\">)</span> <span class=\\"token comment\\">// false</span>\\n</code></pre></div>"}');export{r as comp,k as data};
