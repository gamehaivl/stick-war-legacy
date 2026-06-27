# GameHaiVL Static GitHub Pages

Bộ mã này được chuyển từ HTML WordPress/Flatsome gốc sang dạng tĩnh để chạy ổn trên GitHub Pages.

## Cấu trúc

```text
.
├── index.html
├── assets/
│   ├── css/style.css
│   └── js/main.js
└── .nojekyll
```

## Cách dùng trên GitHub Pages

1. Tạo repository mới trên GitHub.
2. Upload toàn bộ file trong thư mục này lên repository.
3. Vào **Settings → Pages**.
4. Chọn **Deploy from a branch**.
5. Chọn branch `main` và folder `/root`.
6. Lưu lại, sau đó mở link GitHub Pages được GitHub cấp.

## Những phần đã tối ưu

- Bỏ WordPress admin bar, plugin CSS/JS nặng, wpDiscuz form và các script không chạy được trên GitHub Pages.
- Chuyển URL tương đối `/wp-content/...` sang URL đầy đủ `https://gamehaivl.com/wp-content/...` để ảnh/icon không lỗi khi chạy ở GitHub.
- Giữ meta SEO, Open Graph, Twitter Card, canonical và schema JSON-LD từ bản gốc.
- Tách code thành `index.html`, `style.css`, `main.js` để dễ chỉnh sửa.
- Bổ sung responsive mobile menu, tab bài viết liên quan, nút lên đầu trang và mục lục gọn nhẹ.

## Lưu ý

GitHub Pages chỉ chạy web tĩnh. Các tính năng phụ thuộc WordPress/PHP như bình luận, đăng nhập, admin bar, shortcode động hoặc plugin server-side sẽ không hoạt động như WordPress thật. Nút tải vẫn có JS gọi endpoint gốc; nếu endpoint chặn CORS, trang sẽ hiện nút mở bài gốc.
