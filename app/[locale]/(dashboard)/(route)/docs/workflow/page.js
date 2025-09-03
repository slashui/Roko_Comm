import Image from 'next/image'
import { useTranslations } from "next-intl";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default function Home({ params }) {
  const t = useTranslations("Dashboard");
  const session = getServerSession(authOptions);
  const lang = params.locale;
  
  return (
    <main className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6"> AI 编程的完整工作流程</h1>
        <div className="bg-white rounded-lg shadow p-6">
          
      
        <div className='my-4'>本指南提供了一个结构化、可重复的流程，介绍如何与AI编程工具合作开发生产级质量的软件。虽然我们以Python构建Supabase MCP服务器为示例，但此流程适用于所有AI辅助编码工作。</div>
        <hr />
         <h2 className='text-xl font-bold my-4'>1.黄金准则</h2>
这些是指导如何高效、有效地使用 AI 工具的高级原则。我们将在整个过程中通过全局规则和提示来实施这些原则：

<ul class="list-disc space-y-4 mt-4">
  <li><strong>使用 markdown 文件管理项目</strong>（README.md、PLANNING.md、TASK.md）</li>
  <li><strong>代码文件保持在 500 行以下</strong>。需要时拆分为模块</li>
  <li><strong>经常开始新的对话</strong>。长线程会降低响应质量</li>
  <li><strong>不要让模型过载</strong>。每条消息一个任务为最佳</li>
  <li><strong>尽早测试，经常测试</strong>。每个新函数都应有单元测试</li>
  <li><strong>请求要具体</strong>。提供更多上下文，效果更好。示例非常有帮助</li>
  <li><strong>及时进行版本控制</strong>。每个功能完成后都进行 Git 提交</li>
  <li><strong>边写代码边写文档和注释</strong>。不要推迟文档编写</li>
  <li><strong>自行实现环境变量</strong>。不要信任大语言模型处理 API 密钥</li>
</ul>

<hr />

  <h2 className='text-xl font-bold my-4'>2.规划与任务管理</h2>
<div className='my-4'>在开始编写代码前，应先与大语言模型沟通，明确项目的初始范围和任务清单。将范围记录于<span className='text-purple-500 font-bold'>PLANNING.md</span>，任务列表保存在<span className='text-purple-500 font-bold'>TASK.md</span>中。随着项目推进，AI编码助手应持续更新这些文件。</div>

<h3 className='text-lg font-bold my-4 text-purple-500'>PLANNING.md</h3>
<ul class="list-disc space-y-2 mt-4">
  <li>目的：高层愿景、架构、约束、技术栈、工具等。</li>
  <li>AI 提示：“使用 PLANNING.md 中概述的结构和决策。”</li>
  <li>在任何新对话开始时让大语言模型引用此文件。</li>
</ul>


<h3 className='text-lg font-bold my-4 text-purple-500'>TASK.md</h3>
<ul class="list-disc space-y-2 mt-4">
  <li>目的：跟踪当前任务、待办事项和子任务。</li>
  <li>包括：活动工作的项目符号列表、里程碑以及过程中发现的任何内容。</li>
  <li>AI 提示：“更新 TASK.md，将 XYZ 标记为已完成，并添加 ABC 作为新任务。”</li>
</ul>
<hr />

<h2 className='text-xl font-bold my-4'>3.全局规则</h2>
<div className='my-4'>全局（或项目级）规则是强制 AI 编码助手遵循黄金准则的最佳方式。</div>
<div className='my-4'>全局规则适用于所有项目。项目规则适用于当前工作空间。所有 AI IDE 都支持两者。</div>
 
<ul class="list-disc space-y-4">
  <li><strong>Cursor 规则</strong>：<a href="https://docs.cursor.com/context/rules-for-ai" class="text-blue-600 hover:text-blue-800">https://docs.cursor.com/context/rules-for-ai</a></li>
  <li><strong>Windsurf 规则</strong>：<a href="https://docs.codeium.com/windsurf/memories#windsurfrules" class="text-blue-600 hover:text-blue-800">https://docs.codeium.com/windsurf/memories#windsurfrules</a></li>
  <li><strong>Cline 规则</strong>：<a href="https://docs.cline.bot/improving-your-prompting-skills/prompting" class="text-blue-600 hover:text-blue-800">https://docs.cline.bot/improving-your-prompting-skills/prompting</a></li>
</ul>
 

<div className='my-4'>使用以下示例（针对我们的 Supabase MCP 服务器）作为起点，将全局规则添加到您的 AI IDE 系统提示中，以强制保持一致性：</div>

<div className='my-4 bg-purple-50 p-8 text-purple-700 font-Courier rounded-lg'>

### 🔄 Project Awareness & Context<br/>
- **Always read `PLANNING.md`** at the start of a new conversation to understand the project's architecture, goals, style, and constraints.<br/>
- **Check `TASK.md`** before starting a new task. If the task isn’t listed, add it with a brief description and today's date.<br/>
- **Use consistent naming conventions, file structure, and architecture patterns** as described in `PLANNING.md`.<br/><br/>

### 🧱 Code Structure & Modularity<br/>
- **Never create a file longer than 500 lines of code.** If a file approaches this limit, refactor by splitting it into modules or helper files.<br/>
- **Organize code into clearly separated modules**, grouped by feature or responsibility.<br/>
- **Use clear, consistent imports** (prefer relative imports within packages).<br/><br/>

### 🧪 Testing & Reliability<br/>
- **Always create Pytest unit tests for new features** (functions, classes, routes, etc).<br/>
- **After updating any logic**, check whether existing unit tests need to be updated. If so, do it.<br/>
- **Tests should live in a `/tests` folder** mirroring the main app structure.<br/>
  - Include at least:<br/>
    - 1 test for expected use <br/>
    - 1 edge case<br/>
    - 1 failure case<br/><br/>

### ✅ Task Completion<br/>
- **Mark completed tasks in `TASK.md`** immediately after finishing them.<br/>
- Add new sub-tasks or TODOs discovered during development to `TASK.md` under a “Discovered During Work” section.<br/><br/>

### 📎 Style & Conventions<br/>
- **Use Python** as the primary language.<br/>
- **Follow PEP8**, use type hints, and format with `black`.<br/>
- **Use `pydantic` for data validation**.<br/>
- Use `FastAPI` for APIs and `SQLAlchemy` or `SQLModel` for ORM if applicable.<br/>
- Write **docstrings for every function** using the Google style:<br/>
  ```python<br/>
  def example():<br/>
      """<br/>
      Brief summary.<br/>

      Args:<br/>
          param1 (type): Description.<br/>

      Returns:<br/>
          type: Description.<br/>
      """<br/>
  ```<br/><br/>

### 📚 Documentation & Explainability<br/>
- **Update `README.md`** when new features are added, dependencies change, or setup steps are modified.<br/>
- **Comment non-obvious code** and ensure everything is understandable to a mid-level developer.<br/>
- When writing complex logic, **add an inline `# Reason:` comment** explaining the why, not just the what.<br/><br/>

### 🧠 AI Behavior Rules<br/>
- **Never assume missing context. Ask questions if uncertain.**<br/>
- **Never hallucinate libraries or functions** – only use known, verified Python packages.<br/>
- **Always confirm file paths and module names** exist before referencing them in code or tests.<br/>
- **Never delete or overwrite existing code** unless explicitly instructed to or if part of a task from `TASK.md`.<br/><br/>


</div>

<hr />
<h2 className='text-xl font-bold my-4'>4.配置 MCP</h2>
<div className='my-4'>MCP 使您的 AI 助手能够与服务交互，以执行以下操作：</div>

<ul class="list-disc space-y-2 mt-4">
  <li>使用文件系统（读/写、重构、多文件编辑）<a href="https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem" class="text-blue-600 hover:text-blue-800">访问这个MCP</a></li>
 
  <li>搜索网络（非常适合拉取文档），使用 Brave <a href="https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search" class="text-blue-600 hover:text-blue-800">访问这个MCP</a></li>

  <li>使用 Git（分支、差异、提交）<a href="https://github.com/modelcontextprotocol/servers/tree/main/src/git" class="text-blue-600 hover:text-blue-800">访问这个MCP</a></li>

  <li>访问内存和其他工具，例如，连接 Qdrant <a href="https://github.com/qdrant/mcp-server-qdrant/" class="text-blue-600 hover:text-blue-800">访问这个MCP</a></li>

</ul>

<div className='my-4'> <a href="https://github.com/modelcontextprotocol/servers" class="text-blue-600 hover:text-blue-800">查看包含安装说明的大型 MCP 服务器列表</a> </div>

<h3 className='text-lg font-bold my-4 text-purple-500'>如何配置 MCP</h3>

<ul class="list-disc space-y-2 mt-4">
  <li>Cursor MCP：<a href="https://docs.cursor.com/context/model-context-protocol" class="text-blue-600 hover:text-blue-800">https://docs.cursor.com/context/model-context-protocol</a></li>

  <li>Windsurf MCP：<a href="https://docs.codeium.com/windsurf/mcp" class="text-blue-600 hover:text-blue-800">https://docs.codeium.com/windsurf/mcp</a></li>

  <li>Cline MCP：<a href="https://docs.cline.bot/mcp-servers/mcp" class="text-blue-600 hover:text-blue-800">https://docs.cline.bot/mcp-servers/mcp</a></li>


</ul>

使用 Git MCP 服务器的Prompt示例：
<div className='my-4 bg-purple-50 p-8 text-purple-700 font-Courier rounded-lg'>Okay great, I like the current state of the application. Please make a git commit to save the current state.</div>
<hr />
<h2 className='text-xl font-bold my-4'>5.项目启动的初始Prompt</h2>
<div className='my-4'>项目启动阶段的首个提示至关重要。即使您已在<span className='text-purple-500 font-bold'>PLANNING.md</span>中提供了全面概述，在<span className='text-purple-500 font-bold'>TASK.md</span>中列出了明确任务，并设定了良好的全局规则，依然需要提供详尽细节，准确描述您期望大语言模型创建的内容及其参考资料。</div>
<div className='my-4'>虽然具体需求因项目而异，但最佳实践是提供与您目标产品相似的示例。bolt.new、v0、Archon等成功应用的提示都包含了示例参考—您也应当如此。此外，在使用特定工具、框架或API进行开发时，通常还需要提供相关技术文档。</div>

提供示例和文档的三种方式：
<ul class="list-disc space-y-4">
  <li><strong>充分利用AI IDE内置的文档功能</strong>。</li>
  <li><strong>引导大语言模型使用Brave等MCP服务器在网络上查找资料</strong>。您可以直接指令："搜索网络查找其他Python MCP服务器实现案例。"</li>
  <li><strong>优化后的文本更加简洁明了</strong>。分为两个清晰的段落，每段聚焦一个关键点，使指导内容更易于理解和执行。</li>
</ul>


创建初始 Supabase MCP 服务器的示例提示（使用 Python）：
<div className='my-4 bg-purple-50 p-8 text-purple-700 font-Courier rounded-lg'>
使用 @docs:model-context-protocol-docs 和 @docs:supabase-docs，开发一个基于 Python 的 MCP 服务器叫SupaMCP，与 Supabase 数据库交互。服务器需采用 Stdio 传输协议，并实现以下工具功能：
<br /><br />
- 查询表中的记录<br />
- 在表中插入一条或多条记录<br />
- 更新表中的一条或多条记录<br />
- 删除表中的一条或多条记录<br /><br />

每个工具需提供详细描述，确保 MCP 服务器能清晰地向 LLM 传达工具的适用场景及使用方法。<br />
服务器需通过环境变量配置 Supabase 项目 URL 和服务角色密钥。<br />
参考以下 GitHub README，了解如何使用 Python 构建 MCP 服务器：<br />
https://github.com/modelcontextprotocol/python-sdk/tree/main<br />
完成 SupaMCP 服务器开发后，更新 Planning.md 和 Task.md，以反映服务器的初始实现。



</div>


<div className='my-4'>请记住，一旦对话变长，就重新开始对话。当大模型的反馈让您极度沮丧时，您就知道是时候重新开始对话了。 </div>
<hr />
 <h2 className='text-xl font-bold my-4'>6.初始提示后的模块化Prompt流程</h2>
<div className='my-4'>在进行项目后续修复或更改时，建议一次仅分配一个任务，除非任务极为简单。虽然向大语言模型同时提交多项任务很有诱惑力，但越是聚焦的修改，成果就越稳定可靠。</div>
<h4 className=' font-bold my-4 text-purple-500'>好的示例：</h4>
<div className='my-4 ml-4'>'现在更新列表记录函数，添加一个用于过滤记录的参数。'</div>
<h4 className=' font-bold my-4 text-purple-500'>坏的示例：</h4>
<div className='my-4 ml-4'>'更新列表记录以添加过滤功能。然后我收到创建行函数的错误，提示API密钥未找到。另外，我需要为主函数和README.md添加更好的文档，说明如何使用此服务器。'</div>
<div className='my-4'>确保一致输出质量的关键是让大语言模型专注于更新单个文件。<br /><br />始终记住：每次进行更改后，都应让大语言模型更新README.md、PLANNING.md和TASK.md文档！"</div>
<hr />
 <h2 className='text-xl font-bold my-4'>7.每添加一项功能后立即进行测试</h2>
 <div className='my-4'>通过全局规则指示大语言模型在实现每个功能后编写单元测试，或者将此作为您的跟进任务。尽早发现错误能有效防止问题累积，这一环节至关重要！</div>
 <div className='my-4'>虽然单元测试可能令人烦琐，且大语言模型在测试编写上并非完美，但仍应尽量让AI编码助手测试其所有实现。即使在最糟情况下测试环节遇阻，您只想继续推进项目，也可以选择性地要求跳过某功能的测试编写。</div>
<div className='my-4'>测试最佳实践（大语言模型通常了解，但仍需确认）：</div>
<ul class="list-disc space-y-2 mt-4">
  <li>将测试文件置于tests/目录下</li>
  <li>始终"模拟"对数据库和大语言模型等服务的调用，确保不与任何系统进行"真实"交互</li>
  <li>为每个函数至少测试三种情景：一个成功场景、一个预期失败场景（确保错误处理正确）和一个边缘情况</li>
</ul>
<hr />
<h2 className='text-xl font-bold my-4'>8.Docker 部署（以 Supabase MCP 为例）</h2>
<div className='my-4'>这一步骤虽为可选且带有个人偏好，但值得分享我的常用实践！当准备将项目部署至云端或与他人协作时，我通常选择使用 Docker 或 Podman 等工具将项目"容器化"。</div>
<div className='my-4'>大语言模型在处理 Docker 相关任务上表现出色，这使其成为我发现的最可靠的项目打包方式。更重要的是，几乎所有主流云部署服务（如 Render、Railway、Coolify、DigitalOcean、Cloudflare、Netlify 等）均支持 Docker 容器托管。我个人将所有 AI 代理、API 端点和 MCP 服务器都采用 Docker 容器方式进行部署。</div>
<h4 className=' font-bold my-4 text-purple-500'>Dockerfile</h4>
<div className='my-4 bg-purple-50 p-8 text-purple-700 font-Courier rounded-lg'>
FROM python:3.12-slim<br /><br />

WORKDIR /app<br /><br />

COPY requirements.txt .<br />
RUN pip install --no-cache-dir -r requirements.txt<br /><br />

# Copy the MCP server files<br />
COPY . .<br /><br />

CMD ["python", "server.py"]

</div>
<h4 className=' font-bold my-4 text-purple-500'>Build Command</h4>
<div className='my-4 bg-purple-50 p-8 text-purple-700 font-Courier rounded-lg'>docker build -t supabase-mcp .</div>
<h4 className=' font-bold my-4 text-purple-500'>Prompt</h4>
<div className='my-4 bg-purple-50 p-8 text-purple-700 font-Courier rounded-lg'>Write a Dockerfile for this MCP server using requirements.txt.<br />Give me the command to build the container after.</div>
    

        </div>
      </div>
    </main>
  )
}