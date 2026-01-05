# チップ投げアプリ

スタッフにチップを送るモバイルPWAアプリのデモ版です。QRコードをスキャンして、簡単にチップを投げることができます。

## 機能

- ✨ QRコードスキャン機能
- 💰 チップ金額選択（100円、500円、1000円、2000円、5000円）
- 💬 メッセージ機能（感謝のメッセージを添えられる）
- 👤 スタッフプロフィール表示
- ✅ 送信完了画面
- 📱 PWA対応（ホーム画面に追加可能）
- 📷 モバイルカメラアクセス

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **PWA**: next-pwa
- **QRコード**: @zxing/library
- **状態管理**: zustand
- **アイコン**: lucide-react

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でアプリが起動します。

### 3. PWAアイコンの準備

PWAとして動作させるには、アイコン画像が必要です。以下のサイズのアイコンを `public/icons/` に配置してください：

- `icon-192x192.png` (192x192px)
- `icon-512x512.png` (512x512px)

#### アイコン生成方法

以下のいずれかの方法でアイコンを生成できます：

**方法1: オンラインツールを使用**
- [Favicon Generator](https://favicon.io/) でロゴをアップロードして生成
- [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator) を使用

**方法2: コマンドラインで生成**
```bash
# ImageMagickがインストールされている場合
convert -size 192x192 xc:#3b82f6 -gravity center -pointsize 72 -fill white -annotate +0+0 "TIP" public/icons/icon-192x192.png
convert -size 512x512 xc:#3b82f6 -gravity center -pointsize 200 -fill white -annotate +0+0 "TIP" public/icons/icon-512x512.png
```

### 4. ビルド

```bash
npm run build
```

### 5. 本番環境での起動

```bash
npm start
```

## 使い方

### デモモード（QRコードなし）

1. アプリを開く
2. 「デモ用スタッフ一覧」からスタッフを選択
3. チップ金額を選択
4. （任意）メッセージを入力
5. 「確認画面へ」をタップ
6. 内容を確認して「送信する」をタップ

### QRコードスキャンモード

1. アプリを開く
2. 「QRコードをスキャン」ボタンをタップ
3. カメラへのアクセスを許可
4. スタッフのQRコードをスキャン
5. 以降はデモモードと同じ

## QRコードの生成

テスト用にスタッフのQRコードを生成するには、以下のURLをQRコード化してください：

- スタッフ001（山田 太郎）: `https://tip.app/staff/staff_001`
- スタッフ002（佐藤 花子）: `https://tip.app/staff/staff_002`
- スタッフ003（鈴木 次郎）: `https://tip.app/staff/staff_003`

**QRコード生成サイト:**
- [QR Code Generator](https://www.qr-code-generator.com/)
- [QRのススメ](https://qr.quel.jp/)

## デプロイ

### Vercelへのデプロイ

1. GitHubリポジトリを作成

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. [Vercel](https://vercel.com/)にログイン
3. 「New Project」をクリック
4. GitHubリポジトリをインポート
5. デプロイ（自動的にビルドと公開が行われます）

デプロイ後、HTTPS URLが発行されます。このURLでQRコードを生成し、スタッフに配布してください。

## プロジェクト構造

```
/Users/tsucchon/Magbridge/tip/
├── public/
│   ├── icons/              # PWAアイコン
│   └── manifest.json       # PWAマニフェスト
├── src/
│   ├── app/
│   │   ├── page.tsx        # ホーム（QRスキャン画面）
│   │   ├── staff/[id]/     # スタッフ詳細＋チップ送信
│   │   ├── confirm/        # 確認画面
│   │   └── complete/       # 送信完了画面
│   ├── components/
│   │   ├── QRScanner.tsx
│   │   ├── StaffCard.tsx
│   │   ├── TipSelector.tsx
│   │   └── MessageInput.tsx
│   ├── lib/
│   │   ├── types.ts        # 型定義
│   │   ├── mockData.ts     # モックデータ
│   │   ├── store.ts        # 状態管理
│   │   └── utils.ts        # ユーティリティ
│   └── hooks/
│       └── useQRScanner.ts # QRスキャナーフック
```

## モックデータの編集

スタッフ情報を追加・変更するには、`src/lib/mockData.ts` を編集してください。

```typescript
export const MOCK_STAFF: Staff[] = [
  {
    id: 'staff_004',
    name: '新しいスタッフ',
    nameKana: 'あたらしい すたっふ',
    photoUrl: 'https://ui-avatars.com/api/?name=New+Staff&background=ff6b6b&color=fff&size=256',
    position: 'ポジション',
    department: '部署',
    bio: '自己紹介',
    joinedDate: '2024-01-01',
    specialties: ['得意なこと1', '得意なこと2']
  },
  // ...
];
```

## カメラアクセスについて

QRコードスキャン機能を使用するには、以下の条件が必要です：

- **HTTPS接続**: ローカル開発では `localhost` でも動作しますが、本番環境では HTTPS が必須です
- **カメラパーミッション**: 初回アクセス時にカメラへのアクセス許可が求められます
- **対応ブラウザ**: Chrome、Safari、Edge など主要なモダンブラウザ

### iOS Safariでの注意点

- カメラアクセスにはユーザージェスチャー（ボタンタップなど）が必要です
- PWAとしてホーム画面に追加した場合、初回起動時に再度カメラ許可が求められることがあります

## 注意事項

これはデモアプリケーションです：

- 実際の決済処理は行われません（モックUIのみ）
- データは保存されません
- セキュリティ対策は最小限です

本番環境で使用する場合は、以下の実装が必要です：

- バックエンドAPIの構築
- 実際の決済システム統合（Stripe、PayPal など）
- 認証・認可の実装
- データベース連携
- セキュリティ強化（CSRF対策、入力バリデーションなど）

## ライセンス

MIT
