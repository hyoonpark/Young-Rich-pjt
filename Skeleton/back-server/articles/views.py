
from rest_framework.response import Response
from rest_framework.decorators import api_view
# Authentication Decorators
# from rest_framework.decorators import authentication_classes

# permission Decorators
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework import status
from django.shortcuts import get_object_or_404, get_list_or_404
from .serializers import ArticleListSerializer, ArticleSerializer, CommentSerializer, ReplySerializer, ArticleLikeSerializer, CommentLikeSerializer, ReplyLikeSerializer
from .models import Article, Comment, Reply, ArticleLike, CommentLike, ReplyLike



@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def article_list(request):
    if request.method == 'GET':
        # articles = Article.objects.all()
        articles = get_list_or_404(Article)
        serializer = ArticleListSerializer(articles, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            # serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'DELETE', 'PUT'])
def article_detail(request, article_pk):
    # article = Article.objects.get(pk=article_pk)
    article = get_object_or_404(Article, pk=article_pk)

    if request.method == 'GET':
        serializer = ArticleSerializer(article)
        print(serializer.data)
        return Response(serializer.data)
    
    elif request.method == 'DELETE':
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        serializer = ArticleSerializer(article, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


@api_view(['GET'])
def comment_list(request):
    if request.method == 'GET':
        # comments = Comment.objects.all()
        comments = get_list_or_404(Comment)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)


@api_view(['GET', 'DELETE', 'PUT'])
def comment_detail(request, comment_pk):
    # comment = Comment.objects.get(pk=comment_pk)
    comment = get_object_or_404(Comment, pk=comment_pk)

    if request.method == 'GET':
        serializer = CommentSerializer(comment)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

    


@api_view(['POST'])
def comment_create(request, article_pk):
    # article = Article.objects.get(pk=article_pk)
    article = get_object_or_404(Article, pk=article_pk)
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(article=article)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def reply_list(request):
    if request.method == 'GET':
        replies = get_list_or_404(Reply)
        serializer = ReplySerializer(replies, many=True)
        return Response(serializer.data)

@api_view(['GET', 'DELETE', 'PUT'])
def reply_detail(request, reply_pk):
    reply = get_object_or_404(Reply, pk=reply_pk)

    if request.method == 'GET':
        serializer = ReplySerializer(reply)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        reply.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        serializer = ReplySerializer(reply, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


@api_view(['POST'])
def toggle_like(request):
    obj_type = request.data.get('type')
    obj_id = request.data.get('id')

    if obj_type == 'article':
        obj = get_object_or_404(Article, pk=obj_id)
        serializer_class = ArticleLikeSerializer
    elif obj_type == 'comment':
        obj = get_object_or_404(Comment, pk=obj_id)
        serializer_class = CommentLikeSerializer
    elif obj_type == 'reply':
        obj = get_object_or_404(Reply, pk=obj_id)
        serializer_class = ReplyLikeSerializer
    else:
        return Response({'message': 'Invalid object type'}, status=status.HTTP_400_BAD_REQUEST)

    if obj.likes.filter(user=request.user).exists():
        obj.likes.filter(user=request.user).delete()
        return Response({'message': 'Like removed'})
    else:
        serializer = serializer_class(data={'user': request.user.id, obj_type: obj.id})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'message': 'Like added'}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def get_like_status(request, obj_type, obj_id):
    """
    좋아요 상태 및 개수를 가져오는 함수입니다.
    GET 요청으로 좋아요 상태 및 개수를 가져올 객체의 타입(article, comment, reply)과 ID를 전달해야 합니다.
    """

    # 타입에 따라서 좋아요 모델 선택
    if obj_type == 'article':
        model = Article
        like_model = ArticleLike
    elif obj_type == 'comment':
        model = Comment
        like_model = CommentLike
    elif obj_type == 'reply':
        model = Reply
        like_model = ReplyLike
    else:
        return Response({'error': 'Invalid object type'}, status=status.HTTP_400_BAD_REQUEST)

    # 객체 가져오기
    obj = get_object_or_404(model, pk=obj_id)

    # 현재 사용자
    user = request.user

    # 좋아요 여부 확인
    liked = like_model.objects.filter(user=user, **{f"{obj_type}_id": obj_id}).exists()

    # 좋아요 개수
    like_count = like_model.objects.filter(**{f"{obj_type}_id": obj_id}).count()

    return Response({'liked': liked, 'like_count': like_count}, status=status.HTTP_200_OK)
