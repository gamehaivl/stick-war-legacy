# GameHaiVL - GitHub Pages Static Fixed

Bản này được fix lại để chạy ổn định trên GitHub Pages từ mã WordPress/Flatsome gốc.

## Cách dùng nhanh

1. Giải nén file ZIP.
2. Upload toàn bộ nội dung thư mục `gamehaivl-github-pages-fixed` lên repository GitHub.
3. Vào **Settings → Pages**.
4. Chọn **Deploy from a branch** → branch `main` → thư mục `/root`.
5. Truy cập link GitHub Pages sau khi deploy xong.

## Đã fix

- Bỏ admin bar, script admin WordPress và các đoạn dễ gây lỗi trên GitHub Pages.
- Giữ cấu trúc HTML/Flatsome gốc nhiều hơn để giao diện giống website thật.
- Chuyển toàn bộ ảnh `/wp-content/...` thành URL đầy đủ `https://gamehaivl.com/wp-content/...`.
- Giữ meta SEO, Open Graph, Twitter Card và schema JSON-LD.
- Giữ nút tải, bảng thông tin APK, mục lục, nội dung bài viết, sidebar và footer.
- Thêm CSS/JS vá lỗi cho menu mobile, mục lục, ảnh responsive và nút download.
- Thêm `.nojekyll` để GitHub Pages không xử lý sai file tĩnh.

## Lưu ý

Bản này vẫn dùng ảnh/CSS từ domain `gamehaivl.com` để giữ giao diện giống bản gốc. Nếu muốn chạy độc lập 100%, cần tải toàn bộ ảnh/CSS về thư mục local rồi đổi đường dẫn.
