const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));



// 辅助函数：检查输入是否为数字
function parseNumbers(req, res) {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        res.status(400).json({ error: "Invalid input: num1 and num2 must be numbers." });
        return null;
    }

    return { num1, num2 };
}

// 加法接口
app.get('/add', (req, res) => {
    const inputs = parseNumbers(req, res);
    if (inputs) {
        res.json({ result: inputs.num1 + inputs.num2 });
    }
});

// 减法接口
app.get('/subtract', (req, res) => {
    const inputs = parseNumbers(req, res);
    if (inputs) {
        res.json({ result: inputs.num1 - inputs.num2 });
    }
});

// 乘法接口
app.get('/multiply', (req, res) => {
    const inputs = parseNumbers(req, res);
    if (inputs) {
        res.json({ result: inputs.num1 * inputs.num2 });
    }
});

// 除法接口
app.get('/divide', (req, res) => {
    const inputs = parseNumbers(req, res);
    if (inputs) {
        if (inputs.num2 === 0) {
            res.status(400).json({ error: "Cannot divide by zero." });
        } else {
            res.json({ result: inputs.num1 / inputs.num2 });
        }
    }
});

// 启动服务
app.listen(port, () => {
    console.log(`Calculator microservice running at http://localhost:${port}`);
});
