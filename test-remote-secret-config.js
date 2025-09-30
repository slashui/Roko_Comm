#!/usr/bin/env node

/**
 * 远程环境SECRET配置测试
 * 用于验证NextAuth所需的SECRET环境变量配置
 */

// 加载.env文件
require('dotenv').config();

console.log('='.repeat(60));
console.log('🔐 远程环境SECRET配置测试');
console.log('='.repeat(60));

// 1. 检查环境变量
console.log('\n📋 环境变量检查:');
const requiredEnvVars = {
    'SECRET': process.env.SECRET,
    'NEXTAUTH_SECRET': process.env.NEXTAUTH_SECRET,
    'NEXTAUTH_URL': process.env.NEXTAUTH_URL,
    'DATABASE_URL': process.env.DATABASE_URL ? '已设置 (已隐藏)' : '未设置',
    'NODE_ENV': process.env.NODE_ENV
};

for (const [key, value] of Object.entries(requiredEnvVars)) {
    const status = value ? '✅' : '❌';
    const displayValue = key.includes('SECRET') && value ? '已设置 (已隐藏)' : (value || '未设置');
    console.log(`${status} ${key}: ${displayValue}`);
}

// 2. NextAuth配置分析
console.log('\n🔧 NextAuth配置分析:');
try {
    // 模拟NextAuth的secret处理逻辑
    const nextAuthSecret = process.env.NEXTAUTH_SECRET || process.env.SECRET || 'fallback-secret-do-not-use-in-production';
    
    console.log('📝 NextAuth将使用的secret来源:');
    if (process.env.NEXTAUTH_SECRET) {
        console.log('✅ 使用 NEXTAUTH_SECRET (推荐)');
    } else if (process.env.SECRET) {
        console.log('⚠️  使用 SECRET (自定义配置)');
    } else {
        console.log('❌ 使用 fallback secret (不安全，仅开发环境)');
    }
    
    console.log(`🔑 Secret长度: ${nextAuthSecret.length} 字符`);
    console.log(`🔒 Secret强度: ${nextAuthSecret.length >= 32 ? '强' : '弱 (建议至少32字符)'}`);
    
} catch (error) {
    console.error('❌ NextAuth配置分析失败:', error.message);
}

// 3. 环境差异分析
console.log('\n🔍 环境差异分析:');
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

console.log(`📍 当前环境: ${process.env.NODE_ENV || '未设置'}`);

if (isProduction) {
    console.log('🚨 生产环境检查:');
    
    if (!process.env.NEXTAUTH_SECRET && !process.env.SECRET) {
        console.log('❌ 生产环境必须设置 NEXTAUTH_SECRET 或 SECRET');
    } else {
        console.log('✅ Secret已设置');
    }
    
    if (!process.env.NEXTAUTH_URL) {
        console.log('❌ 生产环境必须设置 NEXTAUTH_URL');
    } else {
        console.log('✅ NEXTAUTH_URL已设置');
    }
} else if (isDevelopment) {
    console.log('🔧 开发环境检查:');
    console.log('ℹ️  开发环境可以使用fallback secret，但建议设置真实的secret');
} else {
    console.log('⚠️  环境类型未明确设置');
}

// 4. 建议的环境变量配置
console.log('\n💡 建议的环境变量配置:');
console.log('\n对于远程/生产环境，请设置以下环境变量:');
console.log('```');
console.log('SECRET=your-strong-secret-key-at-least-32-characters');
console.log('NEXTAUTH_SECRET=your-strong-secret-key-at-least-32-characters');
console.log('NEXTAUTH_URL=https://your-domain.com');
console.log('NODE_ENV=production');
console.log('DATABASE_URL=your-database-connection-string');
console.log('```');

// 5. 生成强密钥建议
console.log('\n🔐 生成强密钥建议:');
console.log('可以使用以下命令生成强密钥:');
console.log('```bash');
console.log('# 方法1: 使用openssl');
console.log('openssl rand -base64 32');
console.log('');
console.log('# 方法2: 使用Node.js');
console.log('node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'base64\'))"');
console.log('```');

// 6. 示例强密钥
const crypto = require('crypto');
const exampleSecret = crypto.randomBytes(32).toString('base64');
console.log('\n🎯 示例强密钥 (请生成您自己的):');
console.log(`SECRET=${exampleSecret}`);

console.log('\n='.repeat(60));
console.log('✅ SECRET配置测试完成');
console.log('='.repeat(60));